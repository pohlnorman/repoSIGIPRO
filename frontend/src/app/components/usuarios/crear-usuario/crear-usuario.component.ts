import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthRequest } from '../../../interfaces/auth.request';
import { AuthService } from '../../../services/auth.service';
import { passwordValidator } from '../../../utils/passwordValidator';
import { Location } from '@angular/common';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../interfaces/persona';

@Component({
  selector: 'app-crear-usuario',
  imports: [ReactiveFormsModule,NavbarComponent],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent implements OnInit {
  form: FormGroup;
  personaId: number | undefined;
  persona:Persona|undefined;
  errorMessage: string | null = null;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private personaService:PersonaService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }
  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.personaId = id;
      this.personaService.findById(id).subscribe({
        next:(persona)=>{
          this.persona=persona;
        }
      });
    }
  }
  onSubmit() {
    const authRequest: AuthRequest = {
      username: this.form.get("username")!.value,
      password: this.form.get("password")!.value,
      rolId: 3,
      empresaId: null,
      personaId: this.personaId
    };
    this.authService.register(authRequest).subscribe({
      next: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Guardado con exito",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this._location.back();
        });
      },
      error: (e) => {
        this.errorMessage = e.error.message;
      }
    });
  }
  backClicked() {
    this._location.back();
  }
}
