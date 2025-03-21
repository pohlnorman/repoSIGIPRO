import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../interfaces/persona';
import { Contrato } from '../../../interfaces/contrato';
import { ContratoService } from '../../../services/contrato.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ver-persona',
  standalone: false,

  templateUrl: './ver-persona.component.html',
  styleUrl: './ver-persona.component.css'
})
export class VerPersonaComponent implements OnInit {
  personaId: number = 0;
  persona: Persona = {
    nombre: '',
    apellido: '',
    rut: '',
    estado: 0,
    examenVista: undefined
  }
  listaContratos: Contrato[] = []
  dtOptions: Config = {};
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
    };
    this.personaService.findById(this.personaId).subscribe({
      next: (p) => this.persona = p,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    this.contratoService.findAllByPersonaId(this.personaId).subscribe({
      next: (conList) => {
        this.listaContratos = conList
        this.dtTrigger.next(null);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }


}
