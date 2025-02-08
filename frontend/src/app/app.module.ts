import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import {provideHttpClient} from '@angular/common/http'
import { ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPersonaComponent } from './components/personas/lista-persona/lista-persona.component';
import { AgregarPersonaComponent } from './components/personas/agregar-persona/agregar-persona.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { DataTablesModule } from 'angular-datatables';
import { ListaContratosComponent } from './components/contratos/lista-contratos/lista-contratos.component';
import { CrearContratoComponent } from './components/contratos/crear-contrato/crear-contrato.component';




@NgModule({
  declarations: [
    AppComponent,
    ListaPersonaComponent,
    AgregarPersonaComponent,
    HomeComponent,
    NavbarComponent,
    ProgressBarComponent,
    ListaContratosComponent,
    CrearContratoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
    
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
