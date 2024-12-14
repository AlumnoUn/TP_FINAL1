import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin, map} from 'rxjs';
import { ActivatedRoute, RouterModule, Routes} from '@angular/router';
import { Router } from '@angular/router';
import { JuegosService } from '../acceso-juegos/juegos.service';



@Component({
  selector: 'app-buscar-juegos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './buscar-juegos.component.html',
  styles: ``
})
export class BuscarJuegosComponent {

  private gamesApi = '/api/games';

  cargando: boolean = false;
  searchTerm: string = '';
  games: any[] = [];
  errorMessage: string = ''; //
  selectedGame: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router, private juegoService: JuegosService) {}


  searchGames() {
    this.errorMessage = '';
    this.cargando = true;

     this.juegoService.buscarJuegos(this.searchTerm).subscribe((gamesResponse: any) => {
          this.games = gamesResponse;
          this.cargando = false;
          console.log(gamesResponse);
          this.juegoService.setGames(this.games);
          if(this.games.length ===0){
            this.errorMessage = 'No se encontraron juegos con ese título.'; // Error si no hay juegos con la busqueda hecha
          } else {
          }
        }, error => {
          this.cargando = false;
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



