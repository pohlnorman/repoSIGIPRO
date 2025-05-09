import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../interfaces/empresa';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-lista-administradores',
  imports: [NavbarComponent, DataTablesModule],
  templateUrl: './lista-administradores.component.html',
  styleUrl: './lista-administradores.component.css'
})
export class ListaAdministradoresComponent implements OnInit {
  admins: User[] = []
  empresa: Empresa | undefined;
  dtOptions: any = {
    pagingType: 'full_numbers',
    language: {
      url: 'https://cdn.datatables.net/plug-ins/2.2.1/i18n/es-CL.json'
    },
    responsive: true
  };
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.empresaService.findById(id).subscribe({
        next: (empresa) => {
          this.empresa = empresa;
        }
      })
      this.authService.getAdminsByEmpresaId(id).subscribe({
        next: (admins) => {
          this.admins = admins;
          this.dtTrigger.next(null);
        }
      });
    }
  }

}
