import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JuegosService } from '../acceso-juegos/juegos.service';

@Component({
  selector: 'app-detalle-juegos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-juegos.component.html',
  styles: ``
})
export class DetalleJuegosComponent implements OnInit {

  gameId!: number;
  gameDetails: any;
  platformDetails: any;
  platforms: any [] = [];
  private gamesApi = '/api/games';
  errorMessage: string = '';


  constructor(private http: HttpClient, private route: ActivatedRoute, private juegoService: JuegosService) {}



  ///Uso params para poder ir a la route especifica del game/id que necesite
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = +params['id'];
      this.gameDetails = this.juegoService.getGameById(this.gameId);
    });
  }
}
    




    /*

    Codigo previo de prueba

    const url = `/api/games`;
    const headers = new HttpHeaders({
      'Client-ID': 'z95q736cetyb3km0f13zyxu2ll7yfi',
      'Authorization': 'Bearer deujpqb5iviotuqkhkki47n4bae7x2',
      'Content-Type': 'text/plain'
    });
    const body = `fields name, cover.url, summary, rating, platforms; where id = ${this.gameId};`;

    
    // Llamando a la api por los headers
    this.http.post(url, body, {headers}).subscribe(gameDetailsResponse => {
      console.log('Datos del juego: ', gameDetailsResponse);
      this.gameDetails = gameDetailsResponse;
      this.cdr.detectChanges();
    }, error => {
      this.errorMessage = 'Ocurrio un error al buscar juegos.';
    });
  }*/

  