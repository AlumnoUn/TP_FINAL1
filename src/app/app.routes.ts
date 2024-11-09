import { RouterModule, Routes } from '@angular/router';
import { BuscarJuegosComponent } from './juegos/buscar-juegos/buscar-juegos.component';
import { DetalleJuegosComponent } from './juegos/detalle-juegos/detalle-juegos.component';
import { NewReleasesComponent} from './juegos/new-releases/new-releases.component';
import { ListaJuegosGuardadosComponent } from './juegos/lista-juegos-guardados/lista-juegos-guardados.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'juegos', loadChildren: () => import ('./juegos/ruta-juegos/juegos.route')},
    { path: 'buscarJuegos', component: BuscarJuegosComponent},
    { path: 'games/:id', component: DetalleJuegosComponent},
    { path: 'newReleases', component: NewReleasesComponent},
    { path: 'juegosGuardados', component: ListaJuegosGuardadosComponent},
    { path: 'auth',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
    {   //esto es si las rutas fallas redirije a juegos.
        path: '**', redirectTo: 'juegos',
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }