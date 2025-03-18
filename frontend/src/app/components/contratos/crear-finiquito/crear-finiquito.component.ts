import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contrato } from '../../../interfaces/contrato';
import { ContratoFiniquitoAnexoService } from '../../../services/contrato-finiquito-anexo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Finiquito } from '../../../interfaces/finiquito';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-finiquito',
  standalone: false,

  templateUrl: './crear-finiquito.component.html',
  styleUrl: './crear-finiquito.component.css'
})
export class CrearFiniquitoComponent {
  form: FormGroup;
  contrato: Contrato | null = null;

  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoFiniquitoAnexoService,
    private aRouter: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({

      fechaFiniquito: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = Number(this.aRouter.snapshot.paramMap.get('id'));
    console.log(id)

    if (id) {
      this.contratoService.obtenerContratoId(id).subscribe((data: Contrato) => {
        console.log(data)
        this.contrato = data;
      });
    }
  }

  registrarFiniquito(): void {
    if (this.form.valid && this.contrato) {
      const finiquito: Finiquito = {
        fechaFiniquito: this.form.value.fechaFiniquito,
        contratoId: this.contrato.id!,
        estado: 1,
        contrato: this.contrato,
      };
      this.contratoService.crearFiniquito(finiquito, this.contrato.id!).subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Guardado",
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.router.navigate(['/contratos'])
          });
          
        },
        (error) => console.error('Error al registrar finiquito', error)
      )
    }
  }
}
