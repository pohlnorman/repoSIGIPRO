import { Component } from '@angular/core';
import { Contrato } from '../../../interfaces/contrato';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-lista-contratos',
  standalone: false,
  
  templateUrl: './lista-contratos.component.html',
  styleUrl: './lista-contratos.component.css'
})
export class ListaContratosComponent {
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
    this.contratoService.findAllActive().subscribe((data) =>{
      this.listaContratos = data
      this.dtTrigger.next(null);
    })
  }
}
