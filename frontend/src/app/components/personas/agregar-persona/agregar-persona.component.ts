import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../../interfaces/persona';
import { PersonaService } from '../../../services/persona.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-persona',
  standalone: false,
  
  templateUrl: './agregar-persona.component.html',
  styleUrl: './agregar-persona.component.css'
})
export class AgregarPersonaComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private personaService: PersonaService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required]
    })
  }

  agregarPersona(){
    const persona: Persona = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      rut: this.form.get('rut')?.value
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
}
