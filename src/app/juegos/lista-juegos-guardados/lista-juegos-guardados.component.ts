import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { GuardaJuegosService } from '../../service/guarda-juegos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JuegosService } from '../acceso-juegos/juegos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetalleJuegosComponent } from '../detalle-juegos/detalle-juegos.component';
import { AuthService } from '../../auth/service/auth.service';
import { BuscarJuegosComponent } from '../buscar-juegos/buscar-juegos.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-juegos-guardados',
  standalone: true,
  imports: [CommonModule, DetalleJuegosComponent, FormsModule],
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
  searchTerm:string = '';
  isMenuOpen = false;
  menuAbiertoId: number | null = null;

  constructor(private guardaJuegos: GuardaJuegosService, private router:Router, private juegosService: JuegosService, private http: HttpClient, private authService: AuthService){}

  ngOnInit(): void {
    this.cargaJuegos();
  }


  resetSearch(): void {
    this.searchTerm = '';  
    this.cargaJuegos(); 
  }

  searchGamesbyName():void {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id;

    if (!userId) {
      this.cargando = false;
      this.errorMessage = 'No se ha encontrado el ID de usuario. Por favor, inicie sesión nuevamente.';
      return;
    }
    console.log("Buscando: ", this.searchTerm);
    const start = (this.paginaActual - 1) * this.juegosPorPagina;

  if (this.searchTerm.trim() === '') {
    this.cargando = false;
    this.errorMessage = 'Por favor, ingresa un término de búsqueda.';
    return;
  }
    this.guardaJuegos.getGamesBySearch(userId, this.searchTerm)
    .subscribe((response: any[]) => {
      this.cargando = false;   
      if (response.length > 0)
      {    
        this.games = response.slice(0, this.juegosPorPagina).sort((a, b) => a.created_at - b.created_at);
        this.continua = response.length > this.juegosPorPagina;
        console.log('Juegos en esta página:', this.games);
      }
      else{
        this.cargando = false;
        this.errorMessage = 'No existen estos juegos en tu colección.';
        console.log(this.errorMessage);
      } 
     },
        (error) => {
          this.cargando = false;
          console.error('Error al cargar los juegos desde el JSON Server.', error);
          }
        );
    }

  /// Carga Juegos muestra la carga inicial del JSON, pero al toque carga los datos de la API. Apenas tengamos lo de plataformas, estaria bueno que solo muestre la plataforma que el usuario tiene el juego.
  cargaJuegos(): void {
    this.cargando = true;
    this.errorMessage = '';
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id;
    const start = (this.paginaActual - 1) * this.juegosPorPagina;

    if (!userId) {
      this.cargando = false;
      this.errorMessage = 'No se ha encontrado el ID de usuario. Por favor, inicie sesión nuevamente.';
      return;
    }

    this.guardaJuegos.getGames(userId, start, this.juegosPorPagina + 1).subscribe(
      (response: any[]) => {    
        this.cargando = false;   
        if (response.length > 0)
        {    
          this.games = response.slice(0, this.juegosPorPagina).sort((a, b) => a.created_at - b.created_at);
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

  this.gameDetails = [];
  this.indiceImagenActual = 0;
  this.cargando = true;
 

      this.juegosService.buscarJuegoEnJson(id).subscribe(
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

  toggleMenu(event: Event, gameId: number) {
    event.stopPropagation();
    this.menuAbiertoId = this.menuAbiertoId === gameId ? null : gameId;
  }


  removeFromCollection(event: MouseEvent, id: string) {
    this.cargando = true;
    event.stopPropagation();
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id;
    if (!userId) {
      this.cargando = false;
      this.errorMessage = 'No se ha encontrado el ID de usuario. Por favor, inicie sesión nuevamente.';
      return;
    }
    this.guardaJuegos.deleteGameFromCollection(userId, id).subscribe(
      () => {
        console.log(`Juego con ID ${id} eliminado de la colección`);
        this.cargando = false;
        this.isMenuOpen = false;
        // Actualiza la lista de juegos después de la eliminación si es necesario
        this.cargaJuegos();
      },
      error => console.error('Error al eliminar el juego:', error)
    );
  }
  
  closeMenu() {
    this.menuAbiertoId = null;
  }


}
