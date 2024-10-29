import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { BuscarJuegosComponent } from './juegos/buscar-juegos/buscar-juegos.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BaseHttpService } from './shared/services/base-http.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./shared/ui/header/header.component";




@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HeaderComponent,
    BuscarJuegosComponent,
    CommonModule,
],
  providers: [],
  bootstrap: []
  }
)

export class AppModule { }
