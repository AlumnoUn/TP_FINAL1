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

    const buscarJuegos = this.http.post<any[]>(this.gamesApi, 
      `fields name, 
      cover.image_id, 
      summary, 
      rating, 
      platforms.name, 
      platforms.abbreviation, 
      id, 
      genres.name, 
      release_dates.human, 
      screenshots.image_id,
      screenshots.url,
      involved_companies.company.name,
      videos.video_id;
      search "${this.searchTerm}"; where version_parent = null;`, {headers})


    buscarJuegos.subscribe((gamesResponse: any) => {
          this.games = gamesResponse;
          console.log(gamesResponse);
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

    colorRating(rating: number): string {
      if (rating >= 90) {
        return 'rating-max';
      } else if (rating >= 75) {
        return 'rating-good';
      } else if (rating >= 50) {
        return 'rating-mid';
      } else if (rating >= 20) {
        return 'rating-bad';
      } else if (rating >= 1) {
        return 'rating-dead';}
        else {
        return 'rating-unknown';
      }
    }


}



