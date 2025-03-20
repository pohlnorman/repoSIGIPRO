import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContratoService } from '../../../services/contrato.service';
import { Contrato } from '../../../interfaces/contrato';
import { Persona } from '../../../interfaces/persona';
import { Anexo } from '../../../interfaces/anexo';
import { Finiquito } from '../../../interfaces/finiquito';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { AnexoService } from '../../../services/anexo.service';
import { FiniquitoService } from '../../../services/finiquito.service';

@Component({
  selector: 'app-ver-contrato',
  standalone: false,

  templateUrl: './ver-contrato.component.html',
  styleUrl: './ver-contrato.component.css'
})
export class VerContratoComponent implements OnInit {
  contratoId: number = 0;
  persona: Persona = {
    nombre: '',
    apellido: '',
    rut: '',
    estado: 0
  }
  contrato: Contrato = {
    fechaInicio: '',
    estado: 0,
    personaId: 0,
    persona: this.persona
  }
  finiquito: Finiquito = {
    fechaFiniquito: '',
    estado: 0,
    contratoId: 0,
    contrato: this.contrato
  }
  anexoList: Anexo[] = []


  constructor(private contratoService: ContratoService,
    private anexoService: AnexoService,
    private finiquitoService: FiniquitoService,
    private activatedRoute: ActivatedRoute) {
    this.contratoId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
      },
    };
    this.contratoService.findById(this.contratoId).subscribe({
      next: (c) => this.contrato = c,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    this.anexoService.findAllByContratoId(this.contratoId).subscribe({
      next: (al) => {
        this.anexoList = al
        this.dtTrigger.next(null);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    this.finiquitoService.findByContratoId(this.contratoId).subscribe({
      next: (f) => this.finiquito = f,
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

}
