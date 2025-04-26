import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth.response';
import { AuthRequest } from '../interfaces/auth.request';
import { User } from '../interfaces/user';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router,) { }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    const url = api.host + api.login;
    return this.http.post<AuthResponse>(url, authRequest);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (!!!sessionStorage.getItem('token')) {
      return null;
    }
    const token = sessionStorage.getItem('token');
    if (token != null) {
      return JSON.parse(token)
    }
    return null;
  }

  isLogged(): boolean {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('token');
    if (token === null || token === undefined) {
      return false;
    }
    const decodedToken = helper.decodeToken(token);
    const status: boolean = decodedToken.status;
    if (!status) {
      return false;
    }
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  getUser(): User | null {
    if (!this.isLogged) {
      return null;
    }
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem('token');
    if (token === null || token === undefined) {
      return null;
    }
    const decodedToken = helper.decodeToken(token);
    const user: User = {
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
      status: decodedToken.status,
      personaId: decodedToken.personaId,
    }
    return user;
  }

  getRoleName(): string | null {
    const user: any = this.getUser();
    if (user != null) {
      return user.role;
    }
    return null;
  }
  hasAnyRole(roleList: string[]): boolean {
    const role = this.getRoleName();
    if (role && roleList.indexOf(role) >= 0) {
      return true;
    } else {
      return false
    }

  }
}
