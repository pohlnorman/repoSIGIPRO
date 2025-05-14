import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Persona } from '../../../interfaces/persona';
import { PersonaService } from '../../../services/persona.service';
import { rutValidator } from '../../../utils/rutValidator';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { TALLALETRAS } from '../../../constants/tallaLetras';
import { TALLAPANTALON } from '../../../constants/tallaPantalon';
import { TALLAZAPATO } from '../../../constants/tallaZapato';
import { TALLACAMISA } from '../../../constants/tallaCamisa';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-persona',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent,NgbCollapseModule],
  templateUrl: './agregar-persona.component.html',
  styleUrl: './agregar-persona.component.css'
})
export class AgregarPersonaComponent implements OnInit {
  form: FormGroup;
  id: number = 0;
  tilulo: string = 'Agregar';
  tallaPantalones: string[] = TALLAPANTALON
  tallaZapatos: string[] = TALLAZAPATO;
  tallaLetras: string[] = TALLALETRAS;
  tallaCamisas: string[] = TALLACAMISA;
  isCollapsed = true;

  constructor(private fb: FormBuilder, private personaService: PersonaService,
    private aRouter: ActivatedRoute, private _location: Location) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', [Validators.required, rutValidator()]],
      nacionalidad: [''],
      fechaNacimiento: [undefined],
      estadoCivil: [''],
      prefesion: [''],
      telefono: ['', Validators.pattern(/^\d{9}$/)],
      email: ['', Validators.email],
      direccion: [''],
      region: [''],
      comuna: [''],
      afp: [''],
      salud: [''],
      tallaCamisa: [''],
      tallaPantalon: [''],
      tallaZapato: [''],
      tallaPoleron: [''],
      tallaParka: [''],
      tallaOberol: [''],
      examenVista: [undefined],
      examenAltura: [undefined],
      examenGeneral: [undefined],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.tilulo = 'Editar';
      this.obtenerPersona(this.id);
    }
  }

  agregarPersona() {
    this.personaService.create(this.form.value).subscribe(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Persona guardada con exito",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this._location.back();
      });
    })
  }

  obtenerPersona(id: number) {
    this.personaService.findById(id).subscribe((persona: Persona) => {
      this.form.patchValue(persona);
    })
  }
  actualizarPersona() {
    this.personaService.update(this.id, this.form.value).subscribe(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Persona actualizada con exito",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this._location.back();
      });
    })
  }
  async onSubmit() {
    this.clearDates();
    if (this.id == 0) {
      this.personaService.findByRut(this.form.get('rut')?.value).subscribe({
        next: (p) => {
          Swal.fire({
            position: "bottom-end",
            icon: "error",
            title: "Rut ya existe",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: (e) => this.agregarPersona(),
      })

    } else {
      this.actualizarPersona()
    }
  }
  backClicked() {
    this._location.back();
  }
  clearDates() {
    if (this.form.get("fechaNacimiento")?.value == "") {
      this.form.get("fechaNacimiento")?.setValue(null)
    }
    if (this.form.get("examenVista")?.value == "") {
      this.form.get("examenVista")?.setValue(null)
    }
    if (this.form.get("examenAltura")?.value == "") {
      this.form.get("examenAltura")?.setValue(null)
    }
    if (this.form.get("examenGeneral")?.value == "") {
      this.form.get("examenGeneral")?.setValue(null)
    }
  }
}
