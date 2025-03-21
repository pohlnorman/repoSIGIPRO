import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../enviroments/enviroment';
import { Anexo } from '../interfaces/anexo';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  constructor(private http: HttpClient) { }

  create(anexo: Anexo, contratoId: number): Observable<void> {
    const url: string = api.host + api.contrato + "/" + contratoId + api.anexo
    return this.http.post<void>(url, anexo);
  }

  findAllByContratoId(id: number): Observable<Anexo[]> {
    const url: string = api.host + "/allAnnex/" + id
    return this.http.get<Anexo[]>(url)
  }
}
