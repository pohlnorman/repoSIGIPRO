import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Contrato } from '../../../interfaces/contrato';
import { Persona } from '../../../interfaces/persona';
import { ContratoService } from '../../../services/contrato.service';
import { PersonaService } from '../../../services/persona.service';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-crear-contrato',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './crear-contrato.component.html',
  styleUrl: './crear-contrato.component.css'
})
export class CrearContratoComponent implements OnInit {
  form: FormGroup;
  persona: Persona | null = null;


  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoService,
    private personaService: PersonaService,
    private aRouter: ActivatedRoute, private _location: Location
  ) {
    this.form = this.fb.group({
      fechaInicio: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    const id: number = Number(this.aRouter.snapshot.paramMap.get('id'));

    if (id) {
      this.personaService.findById(id).subscribe((data: Persona) => {
        this.persona = data;
      }
      );
    }
  }


  registrarContrato(): void {
    if (this.form.valid && this.persona) {
      const contrato: Contrato = {
        fechaInicio: this.form.value.fechaInicio,
        personaId: this.persona.id!,
        estado: 1,
        persona: this.persona,
        id: 0
      };
      this.contratoService.create(contrato, this.persona.rut).subscribe({
        next: (r) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Contrato guardado con exito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this._location.back();
          });
        },
        error: (e) => console.error("Error"),
      });
    }
  }
  backClicked() {
    this._location.back();
  }
}
