import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CharacterEntryData } from '../../models/character-data-entry.model';
import { EnemyData } from '../../models/enemy-data-entry.model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EntryData } from '../../models/entry-data.model';
import { Select, Store } from '@ngxs/store';
import { GetCharacterInfo, SetEntryData } from '../../actions/character.actions';
import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterInfo } from '../../models/character-data.model';
import { CharacterState } from '../../state/character.state';
import { CharacterResponse } from '../../models/character-data-response.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attribute-entry',
  templateUrl: './attribute-entry.component.html',
  styleUrls: ['./attribute-entry.component.scss']
})
export class AttributeEntryComponent implements OnInit, AfterViewInit {

    constructor(  private _store : Store, private route: ActivatedRoute,) {

     }

charName = '';
charElement = '';
charWeapon = '';
charRarity = '';
  
@Input() charId : number = 0;
@Select(CharacterState.GetCharacterInfo) charInfo$: Observable<CharacterInfo> | undefined;
@Select(CharacterState.GetCharacter) character$: Observable<CharacterResponse> | undefined;


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.charId = params['id'];
    });

    this._store.dispatch(new GetCharacterInfo(this.charId)).pipe().subscribe(x => {
      this.generateCharInfo()
    })

  }

  ngAfterViewInit() :void{

  }


charEntryData : CharacterEntryData = {
  totalHp : 0,
  totalAttack: 0,
  baseAttack: 0,
  totalDefense: 0,
  elementalMastery: 0,
  critRate: 0,
  critDamage: 0,
  energyRecharge: 0,
  healingBonus: 0,
  extraStats: {
    physicalDmgBonus: 0,
    physicalDmgRes: 0,
    anemoDmgBonus: 0,
    anemoDmgRes: 0,
    geoDmgBonus: 0,
    geoDmgRes: 0,
    electroDmgBonus: 0,
    electroDmgRes: 0,
    hydroDmgBonus: 0,
    hydroDmgRes: 0,
    pyroDmgBonus: 0,
    pyroDmgRes: 0,
    cryoDmgBonus: 0,
    cryoDmgRes: 0,
    resistanceShred: 0,
    reactionDamageBonus: 0,
    stamina: 100,
    incomingHealingBonus: 0,
    shieldStrength: 0,
    cdReduction: 0
  },
  otherDmgBonus: {
    normalAttackDmgBonus : 0,
    normalAttackCritRateBonus: 0,
    chargedAttackDmgBonus : 0,
    chargedAttackCritRateBonus: 0,
    plungeAttackDmgBonus : 0,
    plungeAttackCritRateBonus: 0,
    elementalSkillDmgBonus : 0,
    elementalSkillCritRateBonus:0,
    elementalBurstDmgBonus :0,
    elementalBurstCritRateBonus:0,
    allDmgBonus:0,
    movementSpeedBonus:0,
    attackSpeedBonus:0,
    weakspotDmgBonus:0
  },
  characterLevel: 0
 }

enemyData : EnemyData = {
  enemyLevel: 0,
  enemyPhysicalDmgRes: 0,
  enemyAnemoDmgRes: 0,
  enemyGeoDmgRes: 0,
  enemyElectroDmgRes: 0,
  enemyHydroDmgRes: 0,
  enemyPyroDmgRes: 0,
  enemyCryoDmgRes: 0,
  enemyDefReduction: 0
};

url = '../../../../../assets/amber.png';

updateSidePanel(){
  this.url = '../../../../../assets/amber.png';
    
}


 onSubmit(charForm : NgForm, enemyForm: NgForm){
  let entryData : EntryData = { characterEntryData : charForm.value, enemyEntryData : enemyForm.value}
  this._store.dispatch(new SetEntryData(entryData))
}

tab : string = '';

GetTab(event : MatTabChangeEvent){
  this.tab = event.tab.textLabel;
}

generateCharInfo(){
  this.charInfo$?.pipe().subscribe(x => {
    this.charName = x.characterName,
    this.charElement = x.characterElement
    this.charRarity = x.characterRarity
    this.charWeapon = x.characterWeapon
  })
}

}

