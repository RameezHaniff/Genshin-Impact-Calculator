import { State, Selector, StateContext, Action} from '@ngxs/store';
import { Injectable} from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {CharacterGatewayService} from 'src/app/modules/character/gateways/character.gateway.service';
import {GetCharacter, GetCharacterError, GetCharacterSuccess } from 'src/app/modules/character/actions/character.actions';
import { CharacterResponse } from '../models/character-data-response.model';

export class CharacterModel {

    characters : CharacterResponse| null = null;
}

@State<CharacterModel>({name: 'charcter',defaults: {characters: null}})

@Injectable()
export class CharacterState{
  constructor(private _characterGateway: CharacterGatewayService ){}
  
  @Selector()
  static GetCharacter(state: CharacterModel): CharacterResponse| null{
    return state.characters
  }

  @Action(GetCharacter)
    GetCharacters({ dispatch}: StateContext<CharacterModel>, {payload}: GetCharacter) {

      return this._characterGateway.GetCharacterData(payload).pipe(
        map((res) => {
          dispatch(new GetCharacterSuccess(res));
        }),
        catchError(error =>
          of(
            dispatch(new GetCharacterError(error))
          )
        )
      );
    }

    @Action(GetCharacterSuccess)
    GetCharacterSuccess({ patchState }: StateContext<CharacterModel>, { payload }: GetCharacterSuccess) {
      patchState({ characters: payload });
    }

    @Action(GetCharacterError)
    GetCharacterError({ patchState }: StateContext<CharacterModel>,{ payload }: GetCharacterError) {
      patchState({ characters: null });
    }
}


