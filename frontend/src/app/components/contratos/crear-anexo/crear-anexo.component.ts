import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from '../../../interfaces/contrato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratoFiniquitoAnexoService } from '../../../services/contrato-finiquito-anexo.service';
import { Anexo } from '../../../interfaces/anexo';

@Component({
  selector: 'app-crear-anexo',
  standalone: false,
  
  templateUrl: './crear-anexo.component.html',
  styleUrl: './crear-anexo.component.css'
})
export class CrearAnexoComponent {
  form: FormGroup;
  contrato: Contrato | null = null;

  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoFiniquitoAnexoService,
    private aRouter: ActivatedRoute,
    private router: Router,
  ){
    this.form = this.fb.group({
          
          fechaAnexo: ['', Validators.required],
        });
  }

  ngOnInit(): void{
      const id = Number(this.aRouter.snapshot.paramMap.get('id')) ;
      console.log(id)
      
      if (id) {
            this.contratoService.obtenerContratoId(id).subscribe((data: Contrato) =>{
                    console.log(data)
                    this.contrato = data;
            });
          }
    }

    registrarAnexo(): void{
      if (this.form.valid && this.contrato) {
        const anexo: Anexo = {
          fechaAnexo: this.form.value.fechaAnexo,
          contratoId: this.contrato.id!,
          estado: 1,
          contrato: this.contrato,
        };
        this.contratoService.crearAnexo(anexo, this.contrato.id!).subscribe(
          () => {
            alert('Anexo registrado exitosamente');
            this.router.navigate(['/']);
          },
          (error) => console.error('Error al registrar anexo', error)
        )
      }
    }
    
}
