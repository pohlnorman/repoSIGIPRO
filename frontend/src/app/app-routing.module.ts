import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AgregarPersonaComponent } from './components/personas/agregar-persona/agregar-persona.component';
import { ListaPersonaComponent } from './components/personas/lista-persona/lista-persona.component'

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'ver-lista-personas', component: ListaPersonaComponent},
  { path: 'agregar-persona',component:AgregarPersonaComponent},
  { path: '**', redirectTo: '',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
