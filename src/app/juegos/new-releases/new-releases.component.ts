import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JuegosService } from '../acceso-juegos/juegos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'new-releases-call',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-releases.component.html',
  styles: ``
})
export class NewReleasesComponent {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router, private juegoService: JuegosService){}

  private newReleasesApi = '/api/release_dates';
  games: any[] = [];
  errorMessage= '';

  convertirFechaATimestamp(): number {
    const fechadehoy = new Date();
    const dia = fechadehoy.getDate();
    const mes = fechadehoy.getMonth(); 
    const anio = fechadehoy.getFullYear();

    const fecha = new Date(anio,mes,dia);
    return fecha.getTime();
  }

  mostrarJuegosPopulares() {
    this.errorMessage = '';
    const timestamp = this.convertirFechaATimestamp();
    console.log(timestamp);

    const headers = new HttpHeaders({
      'Client-ID': 'z95q736cetyb3km0f13zyxu2ll7yfi',
      'Authorization': 'Bearer deujpqb5iviotuqkhkki47n4bae7x2',
      "Accept": "application/json"
      });

    const buscarJuegosRecientes = this.http.post<any[]>(this.newReleasesApi, 
      `fields game.name,
      game.cover.image_id,
      game.platforms.abbreviation, 
      human
      ; where date < 1730430000000;`, {headers})


    buscarJuegosRecientes.subscribe((gamesResponse: any) => {
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

}
