import{Injectable} from '@angular/core'
import {Observable, observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import { CharacterDataRequest } from '../models/character-data-request.model'
import { CharacterResponse } from '../models/character-data-response.model'
import { CharacterInfo } from '../models/character-data.model'

@Injectable({
    providedIn: 'root'
})

export class CharacterGatewayService{

    constructor(private http: HttpClient){
        
    }
    

    readonly baseURL = 'https://localhost:44336/api/Character'

    GetCharacterData( charRequest: CharacterDataRequest): Observable<CharacterResponse>{
        return this.http.post<CharacterResponse>(this.baseURL, charRequest)
    };

    GetCharacter(charId : number ): Observable<CharacterInfo>{
        return this.http.get<CharacterInfo>(`${this.baseURL}/${+charId}`)
    };
}