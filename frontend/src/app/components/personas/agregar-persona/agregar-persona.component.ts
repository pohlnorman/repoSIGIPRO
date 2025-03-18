import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../../interfaces/persona';
import { PersonaService } from '../../../services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { data } from 'jquery';
import { rutValidator } from '../../../utils/rutValidator';
import {Location} from '@angular/common';

@Component({
  selector: 'app-agregar-persona',
  standalone: false,
  
  templateUrl: './agregar-persona.component.html',
  styleUrl: './agregar-persona.component.css'
})
export class AgregarPersonaComponent {
  form: FormGroup;
  id: number=0;
  tilulo: string = 'Agregar';

  constructor(private fb: FormBuilder, private personaService: PersonaService,
    private router: Router, private aRouter: ActivatedRoute,private _location: Location) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', [Validators.required, rutValidator()]]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    console.log(this.id)
  }

  ngOnInit(): void{
    if (this.id != 0) {
      //es editar
      this.tilulo = 'Editar';
      this.obtenerPersona(this.id);
    }
    
  }

  agregarPersona(){
    const persona: Persona = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      rut: this.form.get('rut')?.value,
      estado: 0
    }
    
    this.personaService.agregarPersona(persona).subscribe(()=>{
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Persona guardada con exito",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/ver-lista-personas'])
    })
  }

  obtenerPersona(id: number){
    this.personaService.obtenerPersona(id).subscribe((data:Persona)=>{
      console.log(data);
      this.form.setValue({
        nombre: data.nombre,
        apellido: data.apellido,
        rut: data.rut
      })
    })
  }
  actualizarPersona(){
    const persona: Persona = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      rut: this.form.get('rut')?.value,
      estado: 0
    }
    
    this.personaService.actualizarPersona(this.id,persona).subscribe(()=>{
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Persona actualizada con exito",
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/ver-lista-personas'])
    })
  }
  async onSubmit(){
    if(this.id==0){
      this.personaService.obtenerPersonaRut(this.form.get('rut')?.value).subscribe({
        next: (p) => {Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: "Rut ya existe",
          showConfirmButton: false,
          timer: 1500
        });},
    error: (e) => this.agregarPersona(),
      })
      
    }else{
      this.actualizarPersona()
    }
  }
  backClicked() {
    this._location.back();
  }
}
