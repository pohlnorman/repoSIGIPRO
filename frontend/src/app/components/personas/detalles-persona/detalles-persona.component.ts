import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { Contrato } from '../../../interfaces/contrato';
import { Persona } from '../../../interfaces/persona';
import { ContratoService } from '../../../services/contrato.service';
import { PersonaService } from '../../../services/persona.service';
import { Config } from 'datatables.net';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-persona',
  imports: [RouterLink,DataTablesModule,CommonModule],
  templateUrl: './detalles-persona.component.html',
  styleUrl: './detalles-persona.component.css'
})
export class DetallesPersonaComponent implements OnInit{
  contratoVigenteId:number|undefined=undefined;
  personaId: number = 0;
  persona: Persona = {
    nombre: '',
    apellido: '',
    rut: '',
    estado: 0,
    examenVista: undefined,
    id: 0
  }
  listaContratos: Contrato[] = []
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private personaService: PersonaService,
    private contratoService: ContratoService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.personaId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
      },
      responsive: true
    };
    this.personaService.findById(this.personaId).subscribe({
      next: (p) => this.persona = p,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    this.contratoService.findAllByPersonaId(this.personaId).subscribe({
      next: (conList:Contrato[]) => {
        this.listaContratos = conList
        this.dtTrigger.next(null);
        conList.forEach(c=>{
          if(c.estado==1){
            this.contratoVigenteId=c.id;
          }
        })
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }
}
