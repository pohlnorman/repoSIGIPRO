import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';
import { api } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(api.host + api.personas);
  }

  findAllHired(): Observable<Persona[]> {
    return this.http.get<Persona[]>(api.host + api.personas + "/hired");
  }

  findById(id: number): Observable<Persona> {
    return this.http.get<Persona>(api.host + api.persona + '/' + id);
  }

  findByRut(rut: string): Observable<Persona> {
    return this.http.get<Persona>(api.host + api.persona + '/findByRut/' + rut);
  }

  create(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(api.host + api.persona, persona);
  }

  update(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(api.host + api.persona + '/' + id, persona)
  }
}
