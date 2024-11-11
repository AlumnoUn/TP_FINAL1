import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JuegosService } from '../acceso-juegos/juegos.service';
import { Router } from '@angular/router';
import { GuardaJuegosService } from '../../service/guarda-juegos.service';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-detalle-juegos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-juegos.component.html',
  styles: ``
})

export class DetalleJuegosComponent implements OnInit {

  gameDetails: any;

  gameId!: number;

  platformDetails: any;
  platforms: any [] = [];
  private gamesApi = '/api/games';

  errorMessage: string = '';
  urlVideoYoutube: string = 'https://www.youtube.com/watch?v=';

  indiceImagenActual: number = 0;

  plataformaSeleccionada: string = '';
  precio: number = 0;
  estadoJuegos: string[] = ['Sellado', 'CIB', 'En Caja', 'Suelto'];
  estado: string = '';

  userLoggedIn: boolean = false;


  constructor(private http: HttpClient, 
    private route: ActivatedRoute, 
    private router:Router, 
    private juegoService: JuegosService, 
    private jsonService: GuardaJuegosService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.indiceImagenActual = 0;
  ///Uso params para poder ir a la route especifica del game/id que necesite
    this.route.params.subscribe(params => {
    this.gameId = +params['id'];
    this.gameDetails = this.juegoService.getGameByIdSearch(this.gameId);    
    this.usuarioLoggeado();
    });
  }

  setGameDetails(gameId: number){
    this.gameDetails = this.juegoService.getGameByIdSearch(this.gameId); 
  }

  siguienteImagen(imagen: any[]){
    this.indiceImagenActual = (this.indiceImagenActual + 1) % imagen.length;
  }

  anteriorImagen(imagen: any[]){
    this.indiceImagenActual = (this.indiceImagenActual - 1 + imagen.length) % imagen.length;
  }

  usuarioLoggeado(){
    this.userLoggedIn = !!this.authService.getCurrentUser();
    console.log(this.userLoggedIn);
  }

   
  saveGame():void {
    const currentUser = this.authService.getCurrentUser();

    const juegoAGuardar = {
      juegoId: this.gameDetails.id,
      name: this.gameDetails.name,
      userId: currentUser?.id,
      image_id: this.gameDetails.cover.image_id,
      rating: this.gameDetails.rating,
      plataforma: this.plataformaSeleccionada,
      precio: this.precio,
      estado: this.estado,
    }
    this.jsonService.saveGame(juegoAGuardar).subscribe((response) => {
      window.alert('¡Juego agregado exitosamente!');
      console.log('Juego agregado exitosamente', response);
      this.router.navigate(['/buscarJuegos']);
    },
      (error) => {
        console.error('No se pudo guardar el juego!', error);
        window.alert('Error al añadir el juego a su biblioteca. Por favor, reinicie y reintente una vez más.');
      }
    );
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