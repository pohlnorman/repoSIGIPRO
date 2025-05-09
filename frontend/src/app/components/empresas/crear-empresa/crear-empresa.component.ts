import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpresaService } from '../../../services/empresa.service';
import Swal from 'sweetalert2';
import { rutValidator } from '../../../utils/rutValidator';

@Component({
  selector: 'app-crear-empresa',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './crear-empresa.component.html',
  styleUrl: './crear-empresa.component.css'
})
export class CrearEmpresaComponent {
  form: FormGroup;
  errorMessage: string | null = null;
  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    private empresaService: EmpresaService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      rut: ['', [Validators.required, rutValidator()]]
    });
  }

  onSubmit() {
    this.empresaService.create(this.form.value).subscribe({
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
      error:(e)=>{
        this.errorMessage=e.error.message;
      }
    });
  }
  backClicked() {
    this._location.back();
  }
}
