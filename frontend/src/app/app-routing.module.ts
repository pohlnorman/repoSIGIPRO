import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AgregarPersonaComponent } from './components/personas/agregar-persona/agregar-persona.component';
import { ListaPersonaComponent } from './components/personas/lista-persona/lista-persona.component'
import { ListaContratosComponent } from './components/contratos/lista-contratos/lista-contratos.component';
import { CrearContratoComponent } from './components/contratos/crear-contrato/crear-contrato.component';
import { CrearAnexoComponent } from './components/contratos/crear-anexo/crear-anexo.component';
import { CrearFiniquitoComponent } from './components/contratos/crear-finiquito/crear-finiquito.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'ver-lista-personas', component: ListaPersonaComponent},
  { path: 'contratos',component:ListaContratosComponent},
  { path: 'agregar-persona',component:AgregarPersonaComponent},
  { path: 'editar/:id', component:AgregarPersonaComponent },
  { path: 'crear-contrato/:rut', component:CrearContratoComponent },
  { path: 'contrato/:id/anexo', component:CrearAnexoComponent},
  { path: 'contrato/:id/finiquito', component:CrearFiniquitoComponent},
  { path: '**', redirectTo: '',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
