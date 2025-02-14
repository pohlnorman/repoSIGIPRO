import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { api } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Contrato } from '../interfaces/contrato';
import { Persona } from '../interfaces/persona';
import { Anexo } from '../interfaces/anexo';
import { Finiquito } from '../interfaces/finiquito';


@Injectable({
  providedIn: 'root'
})
export class ContratoFiniquitoAnexoService {

  constructor(private http: HttpClient) { }

  private log(msg: string) {
      if (isDevMode()) {
        console.log(msg);
      }
    }
  
  getListaContratos(): Observable <Contrato[]>{
    this.log("GET " + api.host + '/contratos');
    return this.http.get<Contrato[]>(api.host + '/contratos')
  }

  crearContrato(contrato: Contrato,rut: string): Observable<void>{
    return this.http.post<void>(api.host + '/persona/contratar/' + rut, contrato);
  }

  obtenerContratoId(id: number):Observable<Contrato>{
    return this.http.get<Contrato>(api.host + '/contrato/finiquito/' + id);
  }

  crearAnexo(anexo: Anexo, id: number): Observable<void>{
    return this.http.post<void>(api.host + '/contrato/' + id + '/anexo', anexo);
  }

  crearFiniquito(finiquito: Finiquito, id: number): Observable<void>{
    return this.http.post<void>(api.host + '/contrato/finiquito/' + id,finiquito)
  }
}
