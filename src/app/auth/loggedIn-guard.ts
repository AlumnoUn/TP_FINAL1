import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  } from './auth-guard.guard'; // Asegúrate de tener tu servicio de autenticación
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.authService.getCurrentUser()) {
      // Si quiere ir a signup o login ya estando loggeado, chau, volvemos a home
      this.router.navigate(['/home']);
      return false;
    }
    return true; // Permite acceso si no está loggeado
  }
}
