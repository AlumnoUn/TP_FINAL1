import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/ui/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

}
