import { inject, Injectable } from "@angular/core";
//import { HttpClient } from "@angular/common/http";
import { BaseHttpService } from "../../shared/juegos-accesos/base-http.service";
import { Observable } from "rxjs";
import { Juegos } from "../../shared/interfaces/juego.interface";

@Injectable({
        providedIn: 'root'
})

export class JuegosService{
    
    private games: any[] = [];

    setGames(games:any[]){
        this.games = games;
    }
    //private http = inject(HttpClient);

getGameById(id: number){
    return this.games.find(game=>game.id === id);
    }
}