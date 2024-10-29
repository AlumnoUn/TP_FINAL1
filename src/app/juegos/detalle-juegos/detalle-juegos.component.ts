import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JuegosService } from '../acceso-juegos/juegos.service';
import { Router } from '@angular/router';

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

  indiceImagenActual: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router, private juegoService: JuegosService) {}


  ///Uso params para poder ir a la route especifica del game/id que necesite
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = +params['id'];
      this.gameDetails = this.juegoService.getGameById(this.gameId);
    });
  }

  siguienteImagen(imagen: any[]){
    this.indiceImagenActual = (this.indiceImagenActual + 1) % imagen.length;
  }

  anteriorImagen(imagen: any[]){
    this.indiceImagenActual = (this.indiceImagenActual - 1 + imagen.length) % imagen.length;
  }

}