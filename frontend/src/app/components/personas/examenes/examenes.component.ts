import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router }  from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Persona } from '../../../interfaces/persona';
import { PersonaService } from '../../../services/persona.service';


@Component({
  selector: 'app-examenes',
  standalone: false,

  templateUrl: './examenes.component.html',
  styleUrl: './examenes.component.css'
})
export class ExamenesComponent implements OnInit {
  form: FormGroup;
  id: number = 0;
  persona:Persona={
    nombre: '',
    apellido: '',
    rut: '',
    estado: 0,
    id: 0
  }

  constructor(private fb: FormBuilder, private personaService: PersonaService,
    private router: Router, private aRouter: ActivatedRoute, private _location: Location) {
    this.form = this.fb.group({
      examenVista: ['', Validators.required],
    })
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.obtenerPersona(this.id);
    }

  }

  obtenerPersona(id: number) {
    this.personaService.findById(id).subscribe((data: Persona) => {
      this.persona=data
      this.form.setValue({
        examenVista: data.examenVista,
      })
    })
  }
  actualizarPersona() {
    const persona: Persona = {
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      rut: this.persona.rut,
      estado: 0,
      examenVista: this.form.get('examenVista')?.value,
      id: 0
    }

    this.personaService.update(this.id, persona).subscribe(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Guardado",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        //this.router.navigate(['/ver-lista-personas'])
        this._location.back();
      });
    })
  }
  async onSubmit() {
    this.actualizarPersona()
  }
  backClicked() {
    this._location.back();
  }
}
