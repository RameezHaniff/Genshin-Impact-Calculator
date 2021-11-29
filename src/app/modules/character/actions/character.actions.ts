import { HttpErrorResponse } from "@angular/common/http";
import { CharacterDataRequest } from "../models/character-data-request.model";
import { CharacterResponse } from "../models/character-data-response.model";

export class GetCharacter{
    static readonly type = "[Character] GetCharacter"

    constructor(public payload : CharacterDataRequest){}
}

export class GetCharacterSuccess{
    static readonly type = "[Character] GetCharacterSuccess"

    constructor(public payload : CharacterResponse){}
}

export class GetCharacterError{
    static readonly type = "[Character] GetCharacterError"

    constructor(public payload : HttpErrorResponse){}
}

