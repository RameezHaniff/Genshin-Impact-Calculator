import { Injectable } from "@angular/core";
import { CharacterData } from "./character-data.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class CharacterDataService{

    constructor(private http: HttpClient){

    }
    readonly baseURL = 'https://localhost:44336/api/Character'

    list: CharacterData[]|any;

    async getCharacterData(){
     this.list = await this.http.get(this.baseURL)
     .toPromise()
    }
}