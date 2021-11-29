import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {DamageResponse} from '../../models/damage-response';
import { CharacterState } from '../../state/character.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Ability, CharacterResponse } from '../../models/character-data-response.model';
import { first } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss']
})
export class ResultDisplayComponent implements OnInit {

@Input() damage : DamageResponse = new DamageResponse;
@Input() ability : Ability[] = [];

@Select(CharacterState.GetCharacter) character$: Observable<CharacterResponse> | undefined;
constructor(private _store : Store) {}



  ngOnInit(): void {

  }

}

