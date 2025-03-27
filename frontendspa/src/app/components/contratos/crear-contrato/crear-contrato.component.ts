import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Contrato } from '../../../interfaces/contrato';
import { Persona } from '../../../interfaces/persona';
import { ContratoService } from '../../../services/contrato.service';
import { PersonaService } from '../../../services/persona.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-crear-contrato',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './crear-contrato.component.html',
  styleUrl: './crear-contrato.component.css'
})
export class CrearContratoComponent implements OnInit{
  form: FormGroup;
  persona: Persona | null = null;


  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoService,
    private personaService: PersonaService,
    private router: Router,
    private aRouter: ActivatedRoute, private _location: Location
  ) {
    this.form = this.fb.group({

      fechaInicio: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    const rut = this.aRouter.snapshot.paramMap.get('rut');

    if (rut) {
      this.personaService.findByRut(rut).subscribe((data: Persona) => {
        console.log(data)
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
      console.log('idpersona:' + contrato.personaId)
      console.log(contrato)
      this.contratoService.create(contrato, this.persona.rut).subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Contrato guardado con exito",
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            //this.router.navigate(['/ver-lista-personas'])
            this._location.back();
          });
        },
        (error) => console.error('Error al registrar contrato', error)
      );
    }
  }
  backClicked() {
    this._location.back();
  }
}
