import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DetalleJuegosComponent } from "../detalle-juegos/detalle-juegos.component";

@Injectable({
        providedIn: 'root'
})

export class JuegosService{

constructor(private http: HttpClient) {}

private gamesApi = '/api/games';
private games: any[] = [];
private gameDetails: any[] = [];


setGames(games:any[]){
        this.games = games;
    }

getGameByIdSearch(id: number){
    return this.games.find(game=>game.id === id);
    }
 

}




