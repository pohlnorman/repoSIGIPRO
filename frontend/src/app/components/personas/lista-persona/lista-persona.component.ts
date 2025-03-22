import { Component } from '@angular/core';
import { Persona } from '../../../interfaces/persona';
import { PersonaService } from '../../../services/persona.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-persona',
  standalone: false,
  
  templateUrl: './lista-persona.component.html',
  styleUrl: './lista-persona.component.css'
})
export class ListaPersonaComponent {
  listaPersonas: Persona[] = []
  

  constructor( private personaService: PersonaService) { }

  dtOptions: Config = {};
  dtTrigger:Subject<any>=new Subject<any>();

  ngOnInit(): void{
    this.dtOptions={
      pagingType:'full_numbers',
      language: {
        url:'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
    },
    };
    this.getListaPersonas();
  }

  getListaPersonas(){
    this.personaService.findAll().subscribe((data:Persona[]) =>{
      this.listaPersonas = data;
      this.dtTrigger.next(null);
    })
  }
  
}
