import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Contrato } from '../../../interfaces/contrato';
import { AnexoService } from '../../../services/anexo.service';
import { ContratoService } from '../../../services/contrato.service';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-anexo',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, NgbCollapseModule],
  templateUrl: './crear-anexo.component.html',
  styleUrl: './crear-anexo.component.css'
})
export class CrearAnexoComponent implements OnInit {
  form: FormGroup;
  contrato: Contrato | null = null;
  isCollapsed = true;

  constructor(
    private fb: FormBuilder,
    private anexoService: AnexoService,
    private contratoService: ContratoService,
    private aRouter: ActivatedRoute,
    private _location: Location
  ) {
    this.form = this.fb.group({

      fechaEmisionAnexo: ['', Validators.required],
      fechaVigenciaAnexo: ['',],
      motivo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = Number(this.aRouter.snapshot.paramMap.get('id'));

    if (id) {
      this.contratoService.findById(id).subscribe((data: Contrato) => {
        this.contrato = data;
      });
    }
  }

  registrarAnexo(): void {
    this.clearDates();
    if (this.form.valid && this.contrato) {
      this.anexoService.create(this.form.value, this.contrato.id!).subscribe({
        next: () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Guardado",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this._location.back();
          });
        },
        error: (e) => console.error("Error"),
      })
    }
  }
  backClicked() {
    this._location.back();
  }
  clearDates() {
    if (this.form.get("fechaEmisionAnexo")?.value == "") {
      this.form.get("fechaEmisionAnexo")?.setValue(null)
    }
    if (this.form.get("fechaVigenciaAnexo")?.value == "") {
      this.form.get("fechaVigenciaAnexo")?.setValue(null)
    }
  }
}
