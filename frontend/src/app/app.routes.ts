import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrearAnexoComponent } from './components/contratos/crear-anexo/crear-anexo.component';
import { CrearContratoComponent } from './components/contratos/crear-contrato/crear-contrato.component';
import { CrearFiniquitoComponent } from './components/contratos/crear-finiquito/crear-finiquito.component';
import { AgregarPersonaComponent } from './components/personas/agregar-persona/agregar-persona.component';
import { AgregarExamenVistaComponent } from './components/personas/agregar-examen-vista/agregar-examen-vista.component';
import { ListaTodasLasPersonasComponent } from './components/personas/lista-todas-las-personas/lista-todas-las-personas.component';
import { DetallesPersonaComponent } from './components/personas/detalles-persona/detalles-persona.component';
import { DetallesContratoComponent } from './components/contratos/detalles-contrato/detalles-contrato.component';
import { ListaContratosVigentesComponent } from './components/contratos/lista-contratos-vigentes/lista-contratos-vigentes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'ver-lista-personas', component: ListaTodasLasPersonasComponent},
    { path: 'ver-persona/:id', component: DetallesPersonaComponent},
    { path: 'contratos',component:ListaContratosVigentesComponent},
    { path: 'ver-contrato/:id',component:DetallesContratoComponent},
    { path: 'agregar-persona',component:AgregarPersonaComponent},
    { path: 'agregar-examenes/:id',component:AgregarExamenVistaComponent},
    { path: 'editar/:id', component:AgregarPersonaComponent },
    { path: 'crear-contrato/:rut', component:CrearContratoComponent },
    { path: 'contrato/:id/anexo', component:CrearAnexoComponent},
    { path: 'contrato/finiquito/:id', component:CrearFiniquitoComponent},
    { path: '**', redirectTo: '',pathMatch:'full' }
];
