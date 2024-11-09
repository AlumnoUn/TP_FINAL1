import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { BuscarJuegosComponent } from './juegos/buscar-juegos/buscar-juegos.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./shared/ui/header/header.component";
import { DetalleJuegosComponent } from './juegos/detalle-juegos/detalle-juegos.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HeaderComponent,
    BuscarJuegosComponent,
    DetalleJuegosComponent,
    CommonModule,
    AppComponent,
    SharedModule,
    RouterModule,
    ReactiveFormsModule

],
  providers: [],
  bootstrap: []
  }
)

export class AppModule { }
