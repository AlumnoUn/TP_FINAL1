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
/*
private juegosService = inject (JuegosService);

  constructor() { 

    this.juegosService.getJuegos().subscribe((juegos) => {
      console.log(juegos);
    });
  }*/
}
