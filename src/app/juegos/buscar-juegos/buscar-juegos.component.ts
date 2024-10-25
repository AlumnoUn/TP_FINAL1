import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buscar-juegos',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './buscar-juegos.component.html',
  styles: ``
})
export class BuscarJuegosComponent {

  private gamesApi = '/api/games';

  searchTerm: string = '';
  games: any[] = [];
  errorMessage: string = ''; //

  constructor(private http: HttpClient) {}


  searchGames() {
    this.errorMessage = '';
    this.games = [];

    const headers = new HttpHeaders({
      'Client-ID': 'z95q736cetyb3km0f13zyxu2ll7yfi',
      'Authorization': 'Bearer deujpqb5iviotuqkhkki47n4bae7x2'
    });

    this.http.post(this.gamesApi, 
      `fields name, cover.url, summary, rating; search "${this.searchTerm}";`,
      { headers })
        .subscribe((response: any) => {
          this.games = response as any[];
          if(this.games.length ===0){
            this.errorMessage = 'No se encontraron juegos con ese título.'; // Mensaje de error
          }
        }, error => {
          this.errorMessage = 'Ocurrio un error al buscar juegos.';
        });



  }

}
