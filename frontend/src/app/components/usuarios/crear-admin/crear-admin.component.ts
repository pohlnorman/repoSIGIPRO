import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { passwordValidator } from '../../../utils/passwordValidator';
import { AuthRequest } from '../../../interfaces/auth.request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-admin',
  imports: [ReactiveFormsModule,NavbarComponent],
  templateUrl: './crear-admin.component.html',
  styleUrl: './crear-admin.component.css'
})
export class CrearAdminComponent implements OnInit {
  form: FormGroup;
  empresaId: number | undefined;
  errorMessage: string | null = null;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }
  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.empresaId = id;
    }
  }
  onSubmit() {
    const authRequest: AuthRequest = {
      username: this.form.get("username")!.value,
      password: this.form.get("password")!.value,
      rolId: 2,
      empresaId: this.empresaId,
      personaId: null
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
