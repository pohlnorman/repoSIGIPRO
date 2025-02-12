import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';
import { api } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  private log(msg: string) {
    if (isDevMode()) {
      console.log(msg);
    }
  }

  getListaPersonas(): Observable<Persona[]>{
    this.log("GET " + api.host + api.personas);
    return this.http.get<Persona[]>(api.host + api.personas);
  }

  agregarPersona(persona: Persona): Observable<void>{
    return this.http.post<void>(api.host + '/persona/agregar', persona);
  }

  obtenerPersona(id: number):Observable<Persona>{
    return this.http.get<Persona>(api.host + '/persona/' + id);
  }

  obtenerPersonaRut(rut: string):Observable<Persona>{
    return this.http.get<Persona>(api.host + '/persona/contratar/' + rut);
  }

  actualizarPersona(id: number, persona: Persona): Observable<void>{
    return this.http.put<void>(api.host + '/persona/' + id,persona)
  }
}
