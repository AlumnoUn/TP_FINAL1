import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";

@Injectable(

    {
        providedIn: 'root',
    }
    
)

export class BaseHttpService {
    
    http = inject(HttpClient);
    
    apiUrl = environment.API_URL;
     
}

// antes de enviroment
/*private http = inject(HttpClient);
    getJuegos(){
        return this.http.get ('https://api.rawg.io/api/games?key=42e39ea074fd4e738d0f797bd69073e1&dates=2019-09-01,2019-09-30&platforms=18,1,7');
    }*/