import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Anexo } from '../../../interfaces/anexo';
import { Contrato } from '../../../interfaces/contrato';
import { AnexoService } from '../../../services/anexo.service';
import { ContratoService } from '../../../services/contrato.service';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-crear-anexo',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './crear-anexo.component.html',
  styleUrl: './crear-anexo.component.css'
})
export class CrearAnexoComponent implements OnInit {
  form: FormGroup;
  contrato: Contrato | null = null;

  constructor(
    private fb: FormBuilder,
    private anexoService: AnexoService,
    private contratoService: ContratoService,
    private aRouter: ActivatedRoute,
    private _location: Location
  ) {
    this.form = this.fb.group({

      fechaAnexo: ['', Validators.required],
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
    if (this.form.valid && this.contrato) {
      const anexo: Anexo = {
        fechaAnexo: this.form.value.fechaAnexo,
        contratoId: this.contrato.id!,
        estado: 1,
        contrato: this.contrato,
        id: 0
      };
      this.anexoService.create(anexo, this.contrato.id!).subscribe({
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
}
