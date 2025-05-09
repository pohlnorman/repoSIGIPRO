import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { RouterLink } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { PersonaService } from '../../services/persona.service';
import { Empresa } from '../../interfaces/empresa';
import { Persona } from '../../interfaces/persona';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user: User | undefined;
  persona: Persona | undefined;
  empresa: Empresa | undefined;
  constructor(private authService: AuthService,
    private empresaService: EmpresaService,
    private personaService: PersonaService
  ) { }
  ngOnInit(): void {
    this.authService.checkSession().subscribe({
      next: (authResponse) => {
        this.user = authResponse.user;
        if (authResponse.user && authResponse.user.empresaId) {
          this.empresaService.findById(authResponse.user.empresaId).subscribe({
            next: (empresa) => {
              this.empresa = empresa;
            }
          });
        }
        if (authResponse.user && authResponse.user.personaId) {
          this.personaService.findById(authResponse.user.personaId).subscribe({
            next: (persona) => {
              this.persona = persona;
            }
          });
        }
      }
    });
  }

}
