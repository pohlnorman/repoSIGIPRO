import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { Contrato } from '../../../interfaces/contrato';
import { ContratoService } from '../../../services/contrato.service';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-contratos',
  imports: [RouterLink,DataTablesModule,CommonModule],
  templateUrl: './lista-contratos.component.html',
  styleUrl: './lista-contratos.component.css'
})
export class ListaContratosComponent implements OnInit{
  listaContratos: Contrato[] = []
  

  constructor( private contratoService: ContratoService) { }

  dtOptions: Config = {};
  dtTrigger:Subject<any>=new Subject<any>();

  ngOnInit(): void{
    this.dtOptions={
      pagingType:'full_numbers',
      language: {
        url:'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
    },
    };
    this.getListaContratos();
  }

  getListaContratos(){
    this.contratoService.findAllActive().subscribe((data:Contrato[]) =>{
      this.listaContratos = data
      this.dtTrigger.next(null);
    })
  }
}
