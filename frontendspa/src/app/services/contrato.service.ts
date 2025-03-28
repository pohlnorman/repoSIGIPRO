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
    return this.http.get<Contrato>(url);
  }

  findByPersonaIdAndActive(personaId: number): Observable<Contrato> {
    const url: string = api.host + api.persona + '/' + personaId +"/contrato-activo"
    return this.http.get<Contrato>(url);
  }

  findAllActive(): Observable<Contrato[]> {
    const url: string = api.host + api.contratos + '/findAllActive'
    return this.http.get<Contrato[]>(url)
  }

  findAllByPersonaId(id: number): Observable<Contrato[]> {
    const url: string = api.host + '/allContract/' + id
    return this.http.get<Contrato[]>(url)
  }

  create(contrato: Contrato, rut: string): Observable<Contrato> {
    const url: string = api.host + api.persona + "/" + rut + api.contrato
    return this.http.post<Contrato>(url, contrato);
  }

}
