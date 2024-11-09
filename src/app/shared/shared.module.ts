import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent
  ],
  exports: [
    HeaderComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
