import { inject, Injectable } from "@angular/core";
//import { HttpClient } from "@angular/common/http";
import { BaseHttpService } from "../../shared/juegos-accesos/base-http.service";
import { Observable } from "rxjs";
import { Juegos } from "../../shared/interfaces/juego.interface";

@Injectable()

export class JuegosService extends BaseHttpService{
    
    //private http = inject(HttpClient);

    getJuegos(): Observable<Juegos[]>{
        return this.http.get <any> (`${this.apiUrl}/juegos`
            
            /*'https://api.rawg.io/api/games?key=42e39ea074fd4e738d0f797bd69073e1&dates=2019-09-01,2019-09-30&platforms=18,1,7'*/);
    }

}