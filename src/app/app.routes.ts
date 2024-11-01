import { Routes } from '@angular/router';
import { BuscarJuegosComponent } from './juegos/buscar-juegos/buscar-juegos.component';
import { DetalleJuegosComponent } from './juegos/detalle-juegos/detalle-juegos.component';

export const routes: Routes = [
    {  path: 'juegos', loadChildren: () => import ('./juegos/ruta-juegos/juegos.route')},
    {  path: 'buscarJuegos', component: BuscarJuegosComponent},
    { path: 'games/:id', component: DetalleJuegosComponent},

    {   //esto es si las rutas fallas redirije a juegos.
        path: '**', redirectTo: 'juegos',
    },
];
