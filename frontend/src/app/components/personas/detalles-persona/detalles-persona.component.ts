import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { Contrato } from '../../../interfaces/contrato';
import { Persona } from '../../../interfaces/persona';
import { ContratoService } from '../../../services/contrato.service';
import { PersonaService } from '../../../services/persona.service';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AuthService } from '../../../services/auth.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-detalles-persona',
  imports: [RouterLink, DataTablesModule, CommonModule, NavbarComponent, NgbCollapseModule],
  templateUrl: './detalles-persona.component.html',
  styleUrl: './detalles-persona.component.css'
})
export class DetallesPersonaComponent implements OnInit {
  user: User | undefined = undefined;
  rolId: number = -1;
  contratoVigenteId: number | undefined = undefined;
  personaId: number = 0;
  persona: Persona | undefined;
  username: string | undefined;
  listaContratos: Contrato[] = []
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isCollapsed = true;

  constructor(private personaService: PersonaService,
    private contratoService: ContratoService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    const paramMapid = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.personaId = paramMapid;
  }
  ngOnInit(): void {
    this.authService.checkSession().subscribe({
      next: (authResponse) => {
        this.rolId = Number(authResponse.user?.rolId);
        this.user = authResponse.user;
        if (this.user && this.rolId == 2) {
          this.contratoService.findAllByPersonaIdAndEmpresaId(this.personaId, this.user.empresaId).subscribe({
            next: (conList: Contrato[]) => {
              this.listaContratos = conList
              this.dtTrigger.next(null);
              conList.forEach(c => {
                if (c.estado == 1) {
                  this.contratoVigenteId = c.id;
                }
              })
            },
            error: (e) => console.error("Error"),
          })
        }
        if (this.rolId == 1 || this.rolId == 3) {
          this.contratoService.findAllByPersonaId(this.personaId).subscribe({
            next: (conList: Contrato[]) => {
              this.listaContratos = conList
              this.dtTrigger.next(null);
              conList.forEach(c => {
                if (c.estado == 1) {
                  this.contratoVigenteId = c.id;
                }
              })
            },
            error: (e) => console.error("Error"),
          })
        }
      }
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
      },
      responsive: true
    };
    this.personaService.findById(this.personaId).subscribe({
      next: (p) => {
        this.persona = p
        if (p.tieneUsuario && (this.rolId == 1 || this.rolId == 2)) {
          this.authService.getUsernameByPersonaRut(p.rut).subscribe({
            next: (username) => { this.username = username }
          });
        }
      },
      error: (e) => console.error("Error"),
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
