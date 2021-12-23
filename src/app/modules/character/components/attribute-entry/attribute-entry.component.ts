import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CharacterEntryData } from '../../models/character-data-entry.model';
import { EnemyData } from '../../models/enemy-data-entry.model';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EntryData } from '../../models/entry-data.model';
import { Store } from '@ngxs/store';
import { SetEntryData } from '../../actions/character.actions';


@Component({
  selector: 'app-attribute-entry',
  templateUrl: './attribute-entry.component.html',
  styleUrls: ['./attribute-entry.component.scss']
})
export class AttributeEntryComponent implements OnInit {

    constructor(  private _store : Store) {

     }
  

  ngOnInit(): void {
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

 onSubmit(charForm : NgForm, enemyForm: NgForm){
  let entryData : EntryData = { characterEntryData : charForm.value, enemyEntryData : enemyForm.value}
  this._store.dispatch(new SetEntryData(entryData))
}

tab : string = '';

GetTab(event : MatTabChangeEvent){
  this.tab = event.tab.textLabel;
}


}

