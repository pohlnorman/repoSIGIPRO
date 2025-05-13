import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Persona } from '../../../interfaces/persona';
import { PersonaService } from '../../../services/persona.service';
import Swal from 'sweetalert2';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-agregar-examen-vista',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './agregar-examen-vista.component.html',
  styleUrl: './agregar-examen-vista.component.css'
})
export class AgregarExamenVistaComponent implements OnInit {
  form: FormGroup;
  id: number = 0;
  persona: Persona | undefined;

  constructor(private fb: FormBuilder, private personaService: PersonaService,
    private aRouter: ActivatedRoute, private _location: Location) {
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
      this.persona = data
      this.form.setValue({
        examenVista: data.examenVista,
      })
    })
  }
  actualizarPersona() {
    if (this.persona) {
      const persona: Persona = {
        nombre: this.persona.nombre,
        apellido: this.persona.apellido,
        rut: this.persona.rut,
        estado: 0,
        examenVista: this.form.get('examenVista')?.value,
        id: 0,
        tieneUsuario: false,
        nacionalidad: '',
        estadoCivil: '',
        prefesion: '',
        telefono: '',
        email: '',
        direccion: '',
        region: '',
        comuna: '',
        afp: '',
        salud: '',
        tallaCamisa: '',
        tallaPantalon: '',
        tallaZapato: '',
        tallaPoleron: '',
        tallaParka: '',
        tallaOberol: ''
      }
console.log(persona)
      this.personaService.update(this.id, persona).subscribe(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Guardado",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this._location.back();
        });
      })
    }
  }
  async onSubmit() {
    this.actualizarPersona()
  }
  backClicked() {
    this._location.back();
  }
}
