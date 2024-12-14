import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable(

    {
        providedIn: 'root',
    }
    
)

//CLIENT SECRET DE IGDB t8wk427iqj01ix416p0660l1lchpuw
//CLIENT ID z95q736cetyb3km0f13zyxu2ll7yfi

export class BaseHttpService {

    constructor(private http: HttpClient) {    }

    private apiURL = 'https://api.igdb.com/v4/games';

    postGameData(token: string, body: any){
        const headers = {
            'Client-ID': 'z95q736cetyb3km0f13zyxu2ll7yfi',
            'Authorization': 'Bearer u4s74ktzsso7pfnu32s96wl00by85t',
            'Content-Type': 'application/json'
        };
        return this.http.post(this.apiURL, body, {headers});
    }

    private clientAccessRequest = {
        clientID: 'z95q736cetyb3km0f13zyxu2ll7yfi',
        auth: 'Bearer deujpqb5iviotuqkhkki47n4bae7x2',
    }

    public accessToken:string = 'deujpqb5iviotuqkhkki47n4bae7x2';
    
    
    ///POST: https://id.twitch.tv/oauth2/token?client_id=z95q736cetyb3km0f13zyxu2ll7yfi&client_secret=t8wk427iqj01ix416p0660l1lchpuw&grant_type=client_credentials

    /*{
    "access_token": "deujpqb5iviotuqkhkki47n4bae7x2",
    "expires_in": 5302421,
    "token_type": "bearer"
}*/

    
    ///http = inject(HttpClient);
    
    ///apiUrl = environment.API_URL;
     
}

// antes de enviroment
/*private http = inject(HttpClient);
    getJuegos(){
        return this.http.get ('https://api.rawg.io/api/games?key=42e39ea074fd4e738d0f797bd69073e1&dates=2019-09-01,2019-09-30&platforms=18,1,7');
    }*/