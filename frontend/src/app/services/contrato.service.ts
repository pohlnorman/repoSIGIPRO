import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contrato } from '../interfaces/contrato';
import { Observable } from 'rxjs';
import { api } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Contrato> {
    const url: string = api.host + api.contrato + '/' + id
    return this.http.get<Contrato>(url);
  }

  findAllActive(): Observable<Contrato[]> {
    const url: string = api.host + api.contratos + '/findAllActive'
    return this.http.get<Contrato[]>(url)
  }

  findAllByRut(rut: string): Observable<Contrato[]> {
    const url: string = api.host + api.contratos + '/findAllActive'
    return this.http.get<Contrato[]>(url)
  }

  create(contrato: Contrato, rut: string): Observable<void> {
    const url: string = api.host + api.persona + "/" + rut + api.contrato
    return this.http.post<void>(url, contrato);
  }

}
