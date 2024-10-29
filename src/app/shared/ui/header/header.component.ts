import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent{

    icono: number = 1;
    iconoroute: string = `assets/images/${this.icono}.png`;
    getRandomNumber = (min: number, max: number) => {
        return Math.floor(min + Math.random() * max)
      }


  ngOnInit(): void {
    this.icono = this.changePs1Icon(1,31);
    this.iconoroute = `assets/images/${this.icono}.png`
  }

    changePs1Icon(min: number, max:number){
        this.icono = this.getRandomNumber (min, max);
        return this.icono;
      }    
}
