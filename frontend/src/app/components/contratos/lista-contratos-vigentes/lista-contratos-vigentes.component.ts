import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Contrato } from '../../../interfaces/contrato';
import { ContratoService } from '../../../services/contrato.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-lista-contratos-vigentes',
  imports: [RouterLink, DataTablesModule, CommonModule, NavbarComponent],
  templateUrl: './lista-contratos-vigentes.component.html',
  styleUrl: './lista-contratos-vigentes.component.css'
})
export class ListaContratosVigentesComponent implements OnInit {
  listaContratos: Contrato[] = []
  empresaId: number | undefined = undefined;

  constructor(private contratoService: ContratoService,
    private activatedRoute: ActivatedRoute,
  ) {
    
  }

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
      },
      responsive: true
    };
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if(id){
      this.empresaId=id;
      this.getListaContratos(id);
    }
    
  }

  getListaContratos(id:number) {
    this.contratoService.findAllActiveByEmpresaId(id).subscribe((data: Contrato[]) => {
      this.listaContratos = data
      this.dtTrigger.next(null);
    })
  }
}
