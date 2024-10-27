import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

    icono: number = 1;
    icono2: string = '1.png';
    getRandomNumber = (min: number, max: number) => {
        return Math.floor(min + Math.random() * max)
      }
      
    changePs1Icon(min: number, max:number){
        this.icono = this.getRandomNumber (min, max);
        return this.icono;
      }    
}
