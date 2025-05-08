import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anexo } from '../interfaces/anexo';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  constructor(private http: HttpClient) { }

  create(anexo: Anexo, contratoId: number): Observable<Anexo> {
    const url: string = api.host + api.contrato + "/" + contratoId + api.anexo
    return this.http.post<Anexo>(url, anexo, { withCredentials: true });
  }

  findAllByContratoId(id: number): Observable<Anexo[]> {
    const url: string = api.host + "/allAnnex/" + id
    return this.http.get<Anexo[]>(url, { withCredentials: true })
  }
}
