import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import {provideHttpClient} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPersonaComponent } from './components/personas/lista-persona/lista-persona.component';
import { AgregarPersonaComponent } from './components/personas/agregar-persona/agregar-persona.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaPersonaComponent,
    AgregarPersonaComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
