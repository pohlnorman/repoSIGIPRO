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
}
