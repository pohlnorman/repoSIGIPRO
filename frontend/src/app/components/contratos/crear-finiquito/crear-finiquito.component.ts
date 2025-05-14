import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Contrato } from '../../../interfaces/contrato';
import { ContratoService } from '../../../services/contrato.service';
import { FiniquitoService } from '../../../services/finiquito.service';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-finiquito',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, NgbCollapseModule],
  templateUrl: './crear-finiquito.component.html',
  styleUrl: './crear-finiquito.component.css'
})
export class CrearFiniquitoComponent implements OnInit {
  form: FormGroup;
  contrato: Contrato | null = null;
  isCollapsed = true;

  constructor(
    private fb: FormBuilder,
    private finiquitoService: FiniquitoService,
    private contratoService: ContratoService,
    private aRouter: ActivatedRoute,
    private _location: Location
  ) {
    this.form = this.fb.group({

      fechaFiniquito: ['', Validators.required],
      causalTermino: ['', Validators.required],
      indemnizacion: ['',],
      vacacionesProporcionales: ['',],
      sueldoPendiente: ['',],
      ratificacion: ['',],
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

  registrarFiniquito(): void {
    if (this.form.valid && this.contrato) {
      this.finiquitoService.create(this.form.value, this.contrato.id!).subscribe({
        next: (r) => {
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
