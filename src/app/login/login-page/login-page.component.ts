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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    if (this.form.invalid) return;

    const user = this.form.getRawValue() as User;

    this.authService.login(user).subscribe({
      next: (loggedin) => {
        if (loggedin) {
          this.router.navigate(['/juegosGuardados']);
        } 
      }
    })
  }
}
