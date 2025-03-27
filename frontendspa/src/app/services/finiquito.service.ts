import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Finiquito } from '../interfaces/finiquito';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiniquitoService {

  constructor(private http: HttpClient) { }

  create(finiquito: Finiquito, contratoId: number): Observable<Finiquito> {
    const url: string = api.host + api.contrato + "/" + contratoId + api.finiquito
    return this.http.post<Finiquito>(url, finiquito)
  }

  findByContratoId(id: number): Observable<Finiquito> {
    const url: string = api.host + "/liquidation/" + id
    return this.http.get<Finiquito>(url)
  }
}
