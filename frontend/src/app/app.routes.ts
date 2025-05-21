import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CrearAnexoComponent } from './components/contratos/crear-anexo/crear-anexo.component';
import { CrearContratoComponent } from './components/contratos/crear-contrato/crear-contrato.component';
import { CrearFiniquitoComponent } from './components/contratos/crear-finiquito/crear-finiquito.component';
import { AgregarPersonaComponent } from './components/personas/agregar-persona/agregar-persona.component';
import { ListaTodasLasPersonasComponent } from './components/personas/lista-todas-las-personas/lista-todas-las-personas.component';
import { DetallesPersonaComponent } from './components/personas/detalles-persona/detalles-persona.component';
import { DetallesContratoComponent } from './components/contratos/detalles-contrato/detalles-contrato.component';
import { ListaContratosVigentesComponent } from './components/contratos/lista-contratos-vigentes/lista-contratos-vigentes.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { ListaTodasLasEmpresasComponent } from './components/empresas/lista-todas-las-empresas/lista-todas-las-empresas.component';
import { CrearEmpresaComponent } from './components/empresas/crear-empresa/crear-empresa.component';
import { CrearAdminComponent } from './components/usuarios/crear-admin/crear-admin.component';
import { ListaAdministradoresComponent } from './components/usuarios/lista-administradores/lista-administradores.component';
import { RegisterComponent } from './components/usuarios/register/register.component';
import { ListaTallasComponent } from './components/contratos/lista-tallas/lista-tallas.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';

export const routes: Routes = [
    { path: '', redirectTo: "/login", pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'quienes-somos', component: QuienesSomosComponent },
    { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard], data: { role: [1,2,3] } },
    { path: 'personas', component: ListaTodasLasPersonasComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'persona', component: AgregarPersonaComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'persona/:id', component: DetallesPersonaComponent, canActivate: [authGuard], data: { role: [1,2, 3] } },
    { path: 'persona/:id/editar', component: AgregarPersonaComponent, canActivate: [authGuard], data: { role: [1,2, 3] } },
    { path: 'persona/:id/crear-contrato', component: CrearContratoComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'persona/:id/crear-usuario', component: CrearUsuarioComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'contrato/:id', component: DetallesContratoComponent, canActivate: [authGuard], data: { role: [1,2, 3] } },
    { path: 'contrato/:id/crear-anexo', component: CrearAnexoComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'contrato/:id/crear-finiquito', component: CrearFiniquitoComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'empresas', component: ListaTodasLasEmpresasComponent, canActivate: [authGuard], data: { role: [1] } },
    { path: 'empresa', component: CrearEmpresaComponent, canActivate: [authGuard], data: { role: [1] } },
    { path: 'empresa/:id/crear-admin', component: CrearAdminComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'empresa/:id/lista-administradores', component: ListaAdministradoresComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'empresa/:id/contratos', component: ListaContratosVigentesComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'empresa/:id/tallas', component: ListaTallasComponent, canActivate: [authGuard], data: { role: [1,2] } },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];
