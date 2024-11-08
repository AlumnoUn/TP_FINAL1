import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GuardaJuegosService } from '../../service/guarda-juegos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JuegosService } from '../acceso-juegos/juegos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetalleJuegosComponent } from '../detalle-juegos/detalle-juegos.component';

@Component({
  selector: 'app-lista-juegos-guardados',
  standalone: true,
  imports: [CommonModule, DetalleJuegosComponent],
  templateUrl: './lista-juegos-guardados.component.html',
  styles: ``
})
export class ListaJuegosGuardadosComponent {

  games: any[] = [] ;
  gameDetails: any = {};
  paginaActual: number = 1;
  juegosPorPagina: number = 10;
  continua: boolean = true;
  private gamesApi = '/api/games';
  errorMessage:string = '';
  cargando: boolean = false;
  mostrarDetalles: boolean = false;
  urlVideoYoutube: string = 'https://www.youtube.com/watch?v=';

  indiceImagenActual: number = 0;

  constructor(private guardaJuegos: GuardaJuegosService, private router:Router, private juegosService: JuegosService, private http: HttpClient){}

  ngOnInit(): void {
    this.cargaJuegos();
  }



  /// Carga Juegos muestra la carga inicial del JSON, pero al toque carga los datos de la API. Apenas tengamos lo de plataformas, estaria bueno que solo muestre la plataforma que el usuario tiene el juego.
  cargaJuegos(): void {
    this.cargando = true;
    const start = (this.paginaActual - 1) * this.juegosPorPagina;
    this.guardaJuegos.getGames(start, this.juegosPorPagina + 1).subscribe(
      (response: any[]) => {       
        if (response.length > 0)
        {    
          this.games = response.slice(0, this.juegosPorPagina).sort((a, b) => a.created_at - b.created_at);
          this.cargando = false;
          this.continua = response.length > this.juegosPorPagina;
          console.log('Juegos en esta página:', this.games);
        }
        else{
          this.cargando = false;
          this.errorMessage = 'No tienes juegos guardados en tu colección.';
        } 
       },
          (error) => {
            this.cargando = false;
            console.error('Error al cargar los juegos desde el JSON Server.', error);
            }
          );
      }
  

buscarJuegosColeccionEnApi(id: number): void{

  this.cargando = true;
  const headers = new HttpHeaders({
    'Client-ID': 'z95q736cetyb3km0f13zyxu2ll7yfi',
    'Authorization': 'Bearer deujpqb5iviotuqkhkki47n4bae7x2',
    "Accept": "application/json"
    });

    
    const body = `
      fields name, 
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
      where id = (${id});`; 

      this.http.post<any[]>(this.gamesApi, body, { headers }).subscribe(
        (gamesResponse) => {
          this.gameDetails = gamesResponse[0];
          this.mostrarDetalles = true;
          this.cargando = false;     
          console.log(this.gameDetails);
        },
        error => {
          this.cargando = false;
          this.errorMessage = 'Ocurrió un error al buscar juegos!';
          console.error(error);
        }
      );
}

volverALaLista() {
  this.mostrarDetalles = false;
  this.gameDetails = null;
}
  siguientePagina(){
    if (this.continua){
    this.paginaActual++;
    this.cargaJuegos();
    }
  }

  anteriorPagina(){
    if(this.paginaActual > 1 ){
      this.paginaActual--;
      this.cargaJuegos();
      }

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

  siguienteImagen(imagen: any[]){
    this.indiceImagenActual = (this.indiceImagenActual + 1) % imagen.length;
  }

  anteriorImagen(imagen: any[]){
    this.indiceImagenActual = (this.indiceImagenActual - 1 + imagen.length) % imagen.length;
  }

}
