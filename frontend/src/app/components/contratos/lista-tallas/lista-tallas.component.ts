import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { Contrato } from '../../../interfaces/contrato';
import { ContratoService } from '../../../services/contrato.service';
import { DataTablesModule } from 'angular-datatables';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-tallas',
  imports: [RouterLink, DataTablesModule, NavbarComponent, CommonModule],
  templateUrl: './lista-tallas.component.html',
  styleUrl: './lista-tallas.component.css'
})
export class ListaTallasComponent {
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
      pagingType: 'simple_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
      },
      responsive: false
    };
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if (id) {
      this.empresaId = id;
      this.getListaContratos(id);
    }

  }

  getListaContratos(id: number) {
    this.contratoService.findAllActiveByEmpresaId(id).subscribe((data: Contrato[]) => {
      this.listaContratos = data
      this.dtTrigger.next(null);
    })
  }
}
