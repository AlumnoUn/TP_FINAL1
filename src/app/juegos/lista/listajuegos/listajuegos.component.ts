import { Component, inject } from '@angular/core';
import { JuegosService } from '../../acceso-juegos/juegos.service';

@Component({

  selector: 'app-listajuegos',
  standalone: true,
  imports: [],
  templateUrl: './listajuegos.component.html',
  styles: ``,
  providers: [JuegosService]

})

export default class ListajuegosComponent {

}
