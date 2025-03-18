import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratoFiniquitoAnexoService } from '../../../services/contrato-finiquito-anexo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from '../../../interfaces/contrato';
import { Persona } from '../../../interfaces/persona';
import { PersonaService } from '../../../services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-contrato',
  standalone: false,

  templateUrl: './crear-contrato.component.html',
  styleUrl: './crear-contrato.component.css'
})
export class CrearContratoComponent {
  form: FormGroup;
  persona: Persona | null = null;


  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoFiniquitoAnexoService,
    private personaService: PersonaService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({

      fechaInicio: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    const rut = this.aRouter.snapshot.paramMap.get('rut');

    if (rut) {
      this.personaService.obtenerPersonaRut(rut).subscribe((data: Persona) => {
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
      };
      console.log('idpersona:' + contrato.personaId)
      console.log(contrato)
      this.contratoService.crearContrato(contrato, this.persona.rut).subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Contrato guardado con exito",
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.router.navigate(['/ver-lista-personas'])
          });
        },
        (error) => console.error('Error al registrar contrato', error)
      );
    }
  }
}
