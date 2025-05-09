import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../environments/environment';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  create(empresa: Empresa): Observable<void> {
    return this.http.post<void>(api.host + api.empresa + "/register", empresa, { withCredentials: true });
  }

  findAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(api.host + api.empresa + "/findAll", { withCredentials: true });
  }

}
