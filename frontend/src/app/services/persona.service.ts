import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona';
import { api } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(api.host + api.personas, { withCredentials: true });
  }

  findAllHired(): Observable<Persona[]> {
    return this.http.get<Persona[]>(api.host + api.personas + "/hired", { withCredentials: true });
  }

  findById(id: number): Observable<Persona> {
    return this.http.get<Persona>(api.host + api.persona + '/' + id, { withCredentials: true });
  }

  findByRut(rut: string): Observable<Persona> {
    return this.http.get<Persona>(api.host + api.persona + '/findByRut/' + rut, { withCredentials: true });
  }

  create(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(api.host + api.persona, persona, { withCredentials: true });
  }

  update(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(api.host + api.persona + '/' + id, persona, { withCredentials: true })
  }
}
