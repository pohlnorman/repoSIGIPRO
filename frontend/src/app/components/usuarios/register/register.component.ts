import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { rutValidator } from '../../../utils/rutValidator';
import { passwordValidator } from '../../../utils/passwordValidator';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Register } from '../../../interfaces/auth.register';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', [Validators.required, rutValidator()]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', [Validators.required, passwordValidator()]],
    });

    this.form.get('rut')?.valueChanges.subscribe(rut => {
      if (rut && this.form.get('rut')?.valid) {
        this.authService.getPersonaPorRut(rut).subscribe({
          next: (resp) => {
            this.form.patchValue({
              nombre: resp.nombre,
              apellido: resp.apellido
            });

            this.form.get('nombre')?.disable();
            this.form.get('apellido')?.disable();
          },
      error: () => {
        this.form.patchValue({
          nombre: '',
          apellido: ''
        });
      }
    });
  }
});
  }

  onSubmit() {
    if (!(this.form.get("password")?.value === this.form.get("confirmPassword")?.value)) {
      this.errorMessage = "Password no coinciden."
      return;
    }
    const register: Register = this.form.value;
    this.authService.registerWithRoleUser(register).subscribe({
      next: (r: any) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: r.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (e) => {
        this.errorMessage = "Fallo el registro."
      }
    });
  }

}
