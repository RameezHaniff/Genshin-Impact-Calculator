import { Injectable, ViewChild } from "@angular/core";
import { CharacterDataRequest } from "src/app/modules/character/models/character-data-request.model";
import {HttpClient} from "@angular/common/http";
import { AttributeEntryComponent } from "../components/attribute-entry/attribute-entry.component";
import { Observable } from "rxjs";
import { CharacterResponse } from "./character-data-response.model";

@Injectable({
    providedIn: 'root'
})

export class CharacterDataRequestService{

    constructor(private http: HttpClient){
        
    }
    

    readonly baseURL = 'https://localhost:44336/api/Character'

    sendData( charRequest: CharacterDataRequest): Observable<CharacterResponse>{
        return this.http.post<CharacterResponse>(this.baseURL, charRequest)
    };
    
}