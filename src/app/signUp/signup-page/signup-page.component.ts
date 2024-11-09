import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSignup() {
    if (this.form.invalid) return;

    const user = this.form.getRawValue() as User;

    this.authService.signup(user).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    })
  }
}
