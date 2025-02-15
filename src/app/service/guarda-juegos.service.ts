import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class GuardaJuegosService {

  private urlJson = 'http://localhost:3000/games';
  private urlWishlist = 'http://localhost:3000/wishlist';

  constructor(private http: HttpClient) {}

  saveGame(game: any): Observable<any> {
    return this.http.post(this.urlJson, game);
  }

  saveToWishlist(game: any): Observable<any>  {
    return this.http.post(this.urlWishlist,game);
  }

  getGames(userId: string, page: number, limit: number): Observable<any>{
    let params = new HttpParams()
    .set('userId', userId)
    .set('_start', page.toString())
    .set('_limit', limit.toString())
    ;
    return this.http.get<any>(this.urlJson, {params});
  }

  getWishlist(userId: string, page: number, limit: number): Observable<any>{
    let params = new HttpParams()
    .set('userId', userId)
    .set('_start', page.toString())
    .set('_limit', limit.toString())
    ;
    return this.http.get<any>(this.urlWishlist, {params});
  }

  getGamesBySearch(userId: string, searchterm: string): Observable<any> {
    console.log('Buscando juegos con:', searchterm);
    const params = new HttpParams()
      .set('name_like', searchterm)
      .set('userId', userId);
  
    console.log('Parametros enviados:', params.toString());

    return this.http.get<any>(this.urlJson, { params });
  }

  deleteGameFromCollection(userId: string, id:string): Observable<any> {
    console.log('Eliminando juego con ID:', id);
    const params = new HttpParams()
    .set('userId', userId)
    .set('id', id);
  
    return this.http.delete<any>(`${this.urlJson}/${id}`, { params });
  }

  deleteGameFromWishlist(userId: string, id:string): Observable<any> {
    console.log('Eliminando juego con ID:', id);
    const params = new HttpParams()
    .set('userId', userId)
    .set('id', id);
  
    return this.http.delete<any>(`${this.urlWishlist}/${id}`, { params });
  }

}