import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from '../../../interfaces/persona';
import { PersonaService } from '../../../services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { data } from 'jquery';

@Component({
  selector: 'app-agregar-persona',
  standalone: false,
  
  templateUrl: './agregar-persona.component.html',
  styleUrl: './agregar-persona.component.css'
})
export class AgregarPersonaComponent {
  form: FormGroup;
  id: number;
  tilulo: string = 'Agregar ';

  constructor(private fb: FormBuilder, private personaService: PersonaService,
    private router: Router, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    console.log(this.id)
  }

  ngOnInit(): void{
    if (this.id != 0) {
      //es editar
      this.tilulo = 'Editar ';
      this.obtenerPersona(this.id);
    }
    
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
}
