import { Routes } from '@angular/router';
import { BuscarJuegosComponent } from './juegos/buscar-juegos/buscar-juegos.component';
import { DetalleJuegosComponent } from './juegos/detalle-juegos/detalle-juegos.component';
import { NewReleasesComponent} from './juegos/new-releases/new-releases.component';
import { ListaJuegosGuardadosComponent } from './juegos/lista-juegos-guardados/lista-juegos-guardados.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AuthGuard } from './auth/auth-guard.guard';
import { LoggedInGuard } from './auth/loggedIn-guard';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent  },
    { path: 'buscarJuegos', component: BuscarJuegosComponent},
    { path: 'games/:id', component: DetalleJuegosComponent},
    { path: 'newReleases', component: NewReleasesComponent, canActivate: [AuthGuard]},
    { path: 'juegosGuardados', component: ListaJuegosGuardadosComponent, canActivate: [AuthGuard]},
    { path: 'auth',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [LoggedInGuard] },
    {   //esto es si las rutas fallas redirije a juegos.
        path: '**', redirectTo: 'home',
    },
];
