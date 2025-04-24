import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Persona } from '../../../interfaces/persona';
import { PersonaService } from '../../../services/persona.service';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-todas-las-personas',
  imports: [RouterLink,DataTablesModule,CommonModule],
  templateUrl: './lista-todas-las-personas.component.html',
  styleUrl: './lista-todas-las-personas.component.css'
})
export class ListaTodasLasPersonasComponent implements OnInit{
  listaPersonas: Persona[] = []
  

  constructor( private personaService: PersonaService) { }

  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject<any>();

  ngOnInit(): void{
    this.dtOptions={
      pagingType:'full_numbers',
      language: {
        url:'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
    },
    responsive: true
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
