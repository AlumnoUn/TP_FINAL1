import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/ui/header/header.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, CommonModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  public fondourl: string = 'assets/images/banner.png';

}
