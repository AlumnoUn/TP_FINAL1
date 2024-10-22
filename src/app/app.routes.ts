import { Routes } from '@angular/router';

export const routes: Routes = [
    {   
        path: 'juegos', loadChildren: () => import ('./juegos/ruta-juegos/juegos.route'),
    },

    {   //esto es si las rutas fallas redirije a juegos.
        path: '**', redirectTo: 'juegos',
    },
];
