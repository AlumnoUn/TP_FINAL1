import { Routes } from '@angular/router';
import { BuscarJuegosComponent } from '../buscar-juegos/buscar-juegos.component';

export default [
    {path: '', loadComponent: () => import ('../lista/listajuegos/listajuegos.component')},
    {path: 'buscarJuegos', component: BuscarJuegosComponent},
] as Routes;