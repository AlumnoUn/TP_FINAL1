import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin, map} from 'rxjs';
import { ActivatedRoute, RouterModule, Routes} from '@angular/router';
import { Router } from '@angular/router';
import { JuegosService } from '../acceso-juegos/juegos.service';
import juegosRoute from '../ruta-juegos/juegos.route';


@Component({
  selector: 'app-buscar-juegos',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './buscar-juegos.component.html',
  styles: ``
})
export class BuscarJuegosComponent {

  private gamesApi = '/api/games';
  private platformApi = '/api/platforms';
  private genresApi = '/api/genres';
  private ageRatingApi = '/api/age_ratings';
  private releaseDatesApi = '/api/release_dates';
  private artworksApi = '/api/artworks';
  

  searchTerm: string = '';
  games: any[] = [];
  errorMessage: string = ''; //
  selectedGame: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router, private juegoService: JuegosService) {}


  searchGames() {
    this.errorMessage = '';
    ///this.games = [];

    const headers = new HttpHeaders({
      'Client-ID': 'z95q736cetyb3km0f13zyxu2ll7yfi',
      'Authorization': 'Bearer deujpqb5iviotuqkhkki47n4bae7x2',
      "Accept": "application/json"
    });

    ///Forkeo TODOS los llamados a la API y los hago de una vez. Juegos funciona bien al ser buscado, pero los demás deberian recorrer la API y chocamos con limitaciones. Para Plataformas, Generos, y Ratings de Edad, se puede usar JSON Server.
    ///Artworks se encuentra pendiente.

    ///Update: Todo esto NO es necesario. Puedo sacar TODO con /api/games/. Arreglar

    const buscarJuegos = this.http.post<any[]>(this.gamesApi, 
      `fields name, 
      cover.url, 
      summary, 
      rating, 
      platforms.name, 
      platforms.abbreviation, 
      id, 
      age_ratings, 
      genres.name, 
      release_dates.human, 
      screenshots.image_id,
      screenshots.url;
      search "${this.searchTerm}"; where version_parent = null;`, {headers})
    /*
    const buscarPlataformas = this.http.post <any[]>(this.platformApi, `fields id, name, abbreviation, platform_logo;`, { headers });
    const buscarGeneros = this.http.post <any[]>(this.genresApi, `fields id, name;`, {headers});
    const buscarRatingsEdad = this.http.post <any[]>(this.ageRatingApi, `fields id, category;`, {headers});
    const buscarArtworks = this.http.post <any[]>(this.artworksApi, `fields id, url;`, {headers});

    forkJoin({
      games: buscarJuegos,
      platforms: buscarPlataformas,
      genres: buscarGeneros,
      ageRatings: buscarRatingsEdad,
      artworks: buscarArtworks
    }).pipe(
      map(response => {
        //console.log("Respuesta de plataformas:", response.platforms); // Testeo: Solo muestra 10 consolas. Se soluciona con JSON Server
        response.games.forEach(game => {
          ///game.platforms = response.platforms.filter(p => game.platforms?.includes(p.id));
          game.genres = response.genres.filter(g => game.genres?.includes(g.id));
          game.age_ratings = response.ageRatings.filter(ar => game.age_ratings?.includes(ar.id));
          game.artworks = response.artworks.filter(aw => game.artworks?.includes(aw.id));
        });
      return response.games;
  })
).subscribe(data => {
  this.games = data;
  this.juegoService.setGames(this.games);

});*/

///El funcionamiento previo

    buscarJuegos.subscribe((gamesResponse: any) => {
          this.games = gamesResponse;
          this.juegoService.setGames(this.games);
          if(this.games.length ===0){
            this.errorMessage = 'No se encontraron juegos con ese título.'; // Error si no hay juegos con la busqueda hecha
          } else {
          }
        }, error => {
          this.errorMessage = 'Ocurrio un error al buscar juegos.';
        });
  }
  detalleJuego(gameId: number) {
    
    this.router.navigate(['/games', gameId]);
  }


}



