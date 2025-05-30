import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { Anexo } from '../../../interfaces/anexo';
import { Contrato } from '../../../interfaces/contrato';
import { Finiquito } from '../../../interfaces/finiquito';
import { Persona } from '../../../interfaces/persona';
import { AnexoService } from '../../../services/anexo.service';
import { ContratoService } from '../../../services/contrato.service';
import { FiniquitoService } from '../../../services/finiquito.service';
import { PersonaService } from '../../../services/persona.service';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-detalles-contrato',
  imports: [RouterLink, DataTablesModule, CommonModule, NavbarComponent],
  templateUrl: './detalles-contrato.component.html',
  styleUrl: './detalles-contrato.component.css'
})
export class DetallesContratoComponent implements OnInit {
  rolId: number = -1;
  personaId: number | undefined;
  contratoId: number = 0;
  persona: Persona | undefined;
  contrato: Contrato | undefined;
  finiquito: Finiquito | undefined;
  anexoList: Anexo[] = []


  constructor(private personaService: PersonaService,
    private contratoService: ContratoService,
    private anexoService: AnexoService,
    private finiquitoService: FiniquitoService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.contratoId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.authService.checkSession().subscribe({
      next: (authResponse) => {
        this.rolId = Number(authResponse.user?.rolId);
      }
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
      },
      responsive: true
    };
    this.contratoService.findById(this.contratoId).subscribe({
      next: (c) => {
        this.contrato = c
        this.personaService.findById(c.personaId).subscribe({
          next: (p) => {
            this.personaId = p.id
            this.persona = p
          },
          error: (e) => console.error("Error"),
        })
      }
    });
    this.anexoService.findAllByContratoId(this.contratoId).subscribe({
      next: (al) => {
        this.anexoList = al
        this.dtTrigger.next(null);
      },
      error: (e) => console.error("Error"),
    });
    this.finiquitoService.findByContratoId(this.contratoId).subscribe({
      next: (f) => this.finiquito = f,
      error: (e) => {},
    });

  }
  hasAnyRole(roles: number[]): boolean {
    if (this.rolId && roles.indexOf(this.rolId) >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
