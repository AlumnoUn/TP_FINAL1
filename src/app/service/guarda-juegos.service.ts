import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class GuardaJuegosService {

  private urlJson = 'http://localhost:3000/games';

  constructor(private http: HttpClient) {}

  saveGame(game: any): Observable<any> {
    return this.http.post(this.urlJson, game);
  }

  getGames(page: number, limit: number): Observable<any>{
    const params = new HttpParams()
    .set('_start', page.toString())
    .set('_limit', limit.toString())
    ;
    return this.http.get<any>(this.urlJson, {params});
  }


}