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



  public buscarJuegos(searchTerm: string): Observable<any> {

    const headers = new HttpHeaders({
        'Client-ID': 'z95q736cetyb3km0f13zyxu2ll7yfi',
        'Authorization': 'Bearer deujpqb5iviotuqkhkki47n4bae7x2',
        "Accept": "application/json"
        });

    return this.http.post<any[]>(this.gamesApi, 
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
        search "${searchTerm}"; where version_parent = null;`, {headers})

    } 


    buscarJuegoEnJson(id: number): Observable<any>{
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

            return this.http.post<any[]>(this.gamesApi, body, { headers });
    }
  
setGames(games:any[]){
        this.games = games;
    }

getGameByIdSearch(id: number){
    return this.games.find(game=>game.id === id);
    }
 

}




