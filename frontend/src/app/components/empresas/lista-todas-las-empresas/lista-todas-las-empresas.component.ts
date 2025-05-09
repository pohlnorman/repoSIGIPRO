import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { Empresa } from '../../../interfaces/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-todas-las-empresas',
  imports: [NavbarComponent,DataTablesModule,RouterLink],
  templateUrl: './lista-todas-las-empresas.component.html',
  styleUrl: './lista-todas-las-empresas.component.css'
})
export class ListaTodasLasEmpresasComponent implements OnInit {

  empresas: Empresa[] = [];
  dtOptions: any = {
    pagingType: 'full_numbers',
    language: {
      url: 'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
    },
    responsive: true
  };
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.empresaService.findAll().subscribe({
      next: (empresas) => {
        this.empresas = empresas;
        this.dtTrigger.next(null);
      }
    });
  }
}
