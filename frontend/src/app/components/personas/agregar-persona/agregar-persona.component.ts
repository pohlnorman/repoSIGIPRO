import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-persona',
  standalone: false,
  
  templateUrl: './agregar-persona.component.html',
  styleUrl: './agregar-persona.component.css'
})
export class AgregarPersonaComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required]
    })
  }

  agregarPersona(){
    console.log(this.form)
  }
}
