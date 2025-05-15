import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Persona } from '../../../interfaces/persona';
import { ContratoService } from '../../../services/contrato.service';
import { PersonaService } from '../../../services/persona.service';
import { CommonModule, Location } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../interfaces/empresa';

@Component({
  selector: 'app-crear-contrato',
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, NgbCollapseModule],
  templateUrl: './crear-contrato.component.html',
  styleUrl: './crear-contrato.component.css'
})
export class CrearContratoComponent implements OnInit {
  form: FormGroup;
  persona: Persona | null = null;
  isCollapsed = true;
  user: User | undefined = undefined;
  empresas:Empresa[]=[];

  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoService,
    private personaService: PersonaService,
    private aRouter: ActivatedRoute,
    private _location: Location,
    private authService: AuthService,
    private empresaService:EmpresaService,
  ) {
    this.form = this.fb.group({
      fechaInicio: ['', Validators.required],
      cargo: ['', Validators.required],
      labor: ['',],
      lugarDeTrabajo: ['',],
      duracion: ['',],
      horario: ['',],
      sueldoBase: ['',],
      empresaId:['',Validators.required]
    });

  }

  ngOnInit(): void {
    const id: number = Number(this.aRouter.snapshot.paramMap.get('id'));
    if (id) {
      this.personaService.findById(id).subscribe((data: Persona) => {
        this.persona = data;
      });
    }
    this.authService.checkSession().subscribe({
      next: (authResponse) => {
        if (authResponse.user) {
          this.user = authResponse.user;
          if(!authResponse.user.empresaId){
            this.empresaService.findAll().subscribe({
              next:(empresas)=>{
                this.empresas=empresas;
              }
            });
          }else{
            this.empresaService.findById(authResponse.user.empresaId).subscribe({
              next:(empresa)=>{
                this.empresas.push(empresa);
                this.form.get("empresaId")?.setValue(empresa.id)
              }
            });
          }
        }
      }
    });
  }


  registrarContrato(): void {
    if (this.form.valid && this.persona && this.user) {
      this.contratoService.create(this.form.value, this.persona.rut).subscribe({
        next: (r) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Contrato guardado con exito",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this._location.back();
          });
        },
        error: (e) => console.error("Error"),
      });
    }
  }
  backClicked() {
    this._location.back();
  }
}
