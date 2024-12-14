import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../shared/interfaces/user.interface';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  errorMessage: string ='';
  cargando: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    const username = this.form.get('username')?.value ?? '';
    const password = this.form.get('password')?.value ?? '';

    if (!username && !password) {
      this.errorMessage = 'No puede dejar los campos en blanco.';
      return;
    }
    
    if (!username) {
      this.errorMessage = 'El nombre de usuario es obligatorio.';
      return;
    }
    
    if (!password) {
      this.errorMessage = 'La contraseña es obligatoria.';
      return;
    }

    this.cargando = true;
    this.errorMessage = '';

    this.authService.login({ username, password }).subscribe({
      next: (result) => {
        this.cargando = false;
        if (result.success) {
          this.router.navigate(['/juegosGuardados']);
          this.errorMessage = ''; // Limpiar errores
        } else {
            this.errorMessage = result.message;
        }
      },
      error: () => {
        this.cargando = false;
        this.errorMessage = 'Error inesperado. Intente nuevamente.';
      }
    });
  }
}




