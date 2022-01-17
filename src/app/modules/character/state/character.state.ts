import { State, Selector, StateContext, Action} from '@ngxs/store';
import { Injectable} from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {CharacterGatewayService} from 'src/app/modules/character/gateways/character.gateway.service';
import {GetCharacter, GetCharacterError, GetCharacterInfo, GetCharacterInfoError, GetCharacterInfoSuccess, GetCharacterSuccess, SetEntryData } from 'src/app/modules/character/actions/character.actions';
import { CharacterResponse } from '../models/character-data-response.model';
import { CharacterInfo } from '../models/character-data.model';
import { EntryData } from '../models/entry-data.model';

export class CharacterModel {

    characters : CharacterResponse| null = null;
    charInfo : CharacterInfo | null = null;
    entryData : EntryData | null = null;
}

@State<CharacterModel>({name: 'charcter',defaults: {characters: null , charInfo: null, entryData: null}})

@Injectable()
export class CharacterState{
  constructor(private _characterGateway: CharacterGatewayService ){}
  
  @Selector()
  static GetCharacter(state: CharacterModel): CharacterResponse| null{
    return state.characters
  }

  @Selector()
  static GetCharacterInfo(state: CharacterModel): CharacterInfo| null{
    return state.charInfo
  }

  @Selector()
  static GetEntryData(state : CharacterModel) : EntryData | null{
    return state.entryData
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

    @Action(GetCharacterInfo)
    GetCharactersInfo({ dispatch}: StateContext<CharacterModel>, {payload}: GetCharacterInfo) {

      return this._characterGateway.GetCharacter(payload).pipe(
        map((res) => {
          dispatch(new GetCharacterInfoSuccess(res));
        }),
        catchError(error =>
          of(
            dispatch(new GetCharacterInfoError(error))
          )
        )
      );
    }

    @Action(GetCharacterInfoSuccess)
    GetCharacterInfoSuccess({ patchState }: StateContext<CharacterModel>, { payload }: GetCharacterInfoSuccess) {
      patchState({ charInfo: payload });
    }

    @Action(GetCharacterInfoError)
    GetCharacterInfoError({ patchState }: StateContext<CharacterModel>,{ payload }: GetCharacterInfoError) {
      patchState({ charInfo: null });
    }

    @Action(SetEntryData)
    SetEntryData({patchState}: StateContext<CharacterModel>, { payload }: SetEntryData){
      patchState({ entryData : payload});
    }
}


