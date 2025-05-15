import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrato } from '../interfaces/contrato';
import { Observable } from 'rxjs';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Contrato> {
    const url: string = api.host + api.contrato + '/' + id
    return this.http.get<Contrato>(url, { withCredentials: true });
  }

  findByPersonaIdAndActive(personaId: number): Observable<Contrato> {
    const url: string = api.host + api.persona + '/' + personaId + "/contrato-activo"
    return this.http.get<Contrato>(url, { withCredentials: true });
  }

  findAllActive(): Observable<Contrato[]> {
    const url: string = api.host + api.contratos + '/findAllActive'
    return this.http.get<Contrato[]>(url, { withCredentials: true })
  }

  findAllByPersonaId(id: number): Observable<Contrato[]> {
    const url: string = api.host + '/allContract/' + id
    return this.http.get<Contrato[]>(url, { withCredentials: true })
  }

  create(contrato: Contrato, rut: string, empresaId: number): Observable<Contrato> {
    const url: string = api.host + api.persona + "/" + rut + api.contrato
    return this.http.post<Contrato>(url, contrato, { withCredentials: true });
  }

  findAllByPersonaIdAndEmpresaId(personaId: number, empresaId: number): Observable<Contrato[]> {
    const url: string = api.host + '/allContract/' + personaId
    return this.http.get<Contrato[]>(url, { withCredentials: true })
  }

  findAllActiveByEmpresaId(empresaId: number): Observable<Contrato[]> {
    const url: string = api.host + api.contratos + '/findAllActive'
    return this.http.get<Contrato[]>(url, { withCredentials: true })
  }
}
