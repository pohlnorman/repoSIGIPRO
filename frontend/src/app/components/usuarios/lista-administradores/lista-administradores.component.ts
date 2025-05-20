import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { User } from '../../../interfaces/user';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../interfaces/empresa';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-lista-administradores',
  imports: [NavbarComponent, DataTablesModule,RouterLink],
  templateUrl: './lista-administradores.component.html',
  styleUrl: './lista-administradores.component.css'
})
export class ListaAdministradoresComponent implements OnInit {
  empresa: Empresa | undefined;
  users: User[] = [];
  dtOptions: any = {
    pagingType: 'simple_numbers',
    language: {
      url: 'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
    },
    responsive: true
  };
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    const id: number | null = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.empresaService.getAdminsByEmpresaId(id).subscribe({
        next: (empresa) => {
          this.empresa = empresa
          if (empresa.usuarios != undefined) {
            this.users = empresa.usuarios;
            this.dtTrigger.next(null);
          }
        }
      });
    }
  }

}
