import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../interfaces/auth.response';
import { AuthRequest } from '../interfaces/auth.request';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Register } from '../interfaces/auth.register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    const url = api.host + api.auth + api.login;
    return this.http.post<AuthResponse>(url, authRequest, { withCredentials: true });
  }

  logout(): Observable<AuthResponse> {
    const url = api.host + api.auth + api.logout;
    return this.http.post<AuthResponse>(url, {}, { withCredentials: true });
  }

  checkSession(): Observable<AuthResponse> {
    const url = api.host + api.auth + api.check_session;
    return this.http.get<AuthResponse>(url, { withCredentials: true });
  }

  register(authRequest: AuthRequest): Observable<AuthResponse> {
    const url = api.host + api.auth + api.register;
    return this.http.post<AuthResponse>(url, authRequest, { withCredentials: true });
  }

  getUsernameByPersonaRut(rut: string): Observable<string> {
    const url = api.host + api.auth + "/verifyUser";
    return this.http.post<string>(url, { rut }, { withCredentials: true });
  }

  registerWithRoleUser(register: Register): Observable<any> {
    const url = api.host + api.auth + "/registerWithRoleUser";
    return this.http.post<any>(url, register);
  }
}
