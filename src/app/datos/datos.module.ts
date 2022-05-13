import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { DatosRoutingModule } from './datos-routing.module';
import { MaterialModule } from '../material/material.module';

import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResultadoBusquedaComponent } from './components/resultado-busqueda/resultado-busqueda.component';
import { WebDosComponent } from './pages/web-dos/web-dos.component';
import { WebUnoComponent } from './pages/web-uno/web-uno.component';
import { AnunciosComponent } from './components/anuncios/anuncios.component';
import { FechaPublicacionPipe } from './pipes/fecha-publicacion.pipe';


@NgModule({
  declarations: [
    AnuncioComponent,
    BuscarComponent,
    DashboardComponent,
    ResultadoBusquedaComponent,
    WebDosComponent,
    WebUnoComponent,
    AnunciosComponent,
    FechaPublicacionPipe,
  ],
  imports: [
    CommonModule,
    DatosRoutingModule,
    MaterialModule,

    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DatosModule { }
