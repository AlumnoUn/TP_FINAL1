import { Routes } from '@angular/router';

export default [
    {
        path: '', loadComponent: () => import ('../lista/listajuegos/listajuegos.component')
    },
] as Routes;