import { Component } from '@angular/core';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../interfaces/persona';

@Component({
  selector: 'app-persona',
  standalone: false,
  
  templateUrl: './lista-persona.component.html',
  styleUrl: './lista-persona.component.css'
})
export class ListaPersonaComponent {
  listaPersonas: Persona[] = []

  constructor( private personaService: PersonaService) { }

  ngOnInit(): void{
    this.getListaPersonas();
  }

  getListaPersonas(){
    this.personaService.getListaPersonas().subscribe((data) =>{
      this.listaPersonas = data;
    })
  }
}
