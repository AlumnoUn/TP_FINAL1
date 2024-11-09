import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {

    icono: number = 1;
    iconoroute: string = `assets/images/${this.icono}.png`;
    getRandomNumber = (min: number, max: number) => {
        return Math.floor(min + Math.random() * max)
      }
    
    activeUser = false;

    constructor(private authService: AuthService, private router: Router) { }

    onLogout() {
      this.activeUser = false;
      return this.authService.logout().subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      })
    }
  

  ngOnInit(): void {
    this.authService.auth().subscribe({
      next:(user) => {
        if (user) {
          this.activeUser = true;
        }
      }
    })

    this.icono = this.changePs1Icon(1,31);
    this.iconoroute = `assets/images/${this.icono}.png`
  }

    changePs1Icon(min: number, max:number){
        this.icono = this.getRandomNumber (min, max);
        return this.icono;
      }    
}
