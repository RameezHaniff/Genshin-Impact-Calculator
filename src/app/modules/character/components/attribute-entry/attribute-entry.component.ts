import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CharacterEntryData } from '../../models/character-data-entry.model';
import { CharacterDataRequest } from '../../models/character-data-request.model';
import { EnemyData } from '../../models/enemy-data-entry.model';
import { Ability, CharacterResponse } from 'src/app/modules/character/models/character-data-response.model';
import { DamageResponse } from '../../models/damage-response';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SkillDamageArray } from '../../models/skill-damage-array.model';
import {CharacterState} from 'src/app/modules/character/state/character.state';
import {GetCharacter, GetCharacterInfo} from 'src/app/modules/character/actions/character.actions'
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CharacterInfo } from '../../models/character-data.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-attribute-entry',
  templateUrl: './attribute-entry.component.html',
  styleUrls: ['./attribute-entry.component.scss']
})
export class AttributeEntryComponent implements OnInit {

  @Input() charId : number = 0;
  @Select(CharacterState.GetCharacter) character$: Observable<CharacterResponse> | undefined;
  @Select(CharacterState.GetCharacterInfo) charInfo$: Observable<CharacterInfo> | undefined;

    constructor(
      private _store : Store,     
      private route: ActivatedRoute,
      private router: Router
      ) { }
  

  ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.charId = params['id'];
    });
      this._store.dispatch(new GetCharacterInfo(this.charId))
  }

damage : DamageResponse = new DamageResponse;

skillDamage : SkillDamageArray = {
  normalAttack: [],
  elementalBurst: [],
  elementalSkill: []
};

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
    reactionDamageBonus:0,
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
  enemyDefReduction: 0,
};

charRequest : CharacterDataRequest = {
  characterID: this.charId,
  normalAttackLevel: 0,
  elementalSkillLevel: 0,
  elementalBurstLevel: 0
};


  transMult = [9, 17, 40, 68, 104, 162, 245, 383, 540, 725];
  levels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];


  updateNormalAttack(event :any){
    this.charRequest.normalAttackLevel = +(event.target.value);
  }

  updateElementalSkill(event: any){
    this.charRequest.elementalSkillLevel = +(event.target.value);
  }

  updateElementalBurst(event: any){
    this.charRequest.elementalBurstLevel = +(event.target.value);
  }
  
  onSubmit(charForm : NgForm, enemyForm: NgForm){
    this.charEntryData = charForm.value;   
  }

  SendData(){
    this.charRequest.characterID = this.charId;
    this._store.dispatch(new GetCharacter(this.charRequest))
  }

  
ability: Ability[] = [];
execute = false;


  GenerateCards(event : MatTabChangeEvent){
    
    const tab = event.tab.textLabel;

    if (this.execute == false) {
      if (tab === 'Talents') {
        this.character$?.pipe(first()).subscribe(character => {
          character.skills.forEach( skill => {
            this.ability.push(skill.ability)
          })
        })
        this.execute = true;
      }
    }
    
  }

  


  elementFlag: string = '';
  
  elementCheck(event : MatTabChangeEvent){
    
    const tab = event.tab.textLabel;   
      if (tab ==="Talents") {
        this.charInfo$?.pipe(first()).subscribe(character => { this.elementFlag = character.characterElement})
    }
  }

  async calculateStuff(event: MatTabChangeEvent){


    const tab = event.tab.textLabel;

    if (tab ==="Talents") {

      let attack: number = this.charEntryData.totalAttack;
      let crtrate: number = this.charEntryData.critRate /100;
      let crtdmg: number = this.charEntryData.critDamage /100;
      let charlvl: number = this.charEntryData.characterLevel;
      let enmlvl: number = this.enemyData.enemyLevel;
      let defred: number = this.enemyData.enemyDefReduction;
      let elemental: number = this.charEntryData.elementalMastery;
      let reactDmgBns: number = this.charEntryData.extraStats.reactionDamageBonus /100;
      let healingBonus: number = this.charEntryData.healingBonus /100;


    this.character$?.pipe(first()).subscribe(character => {  

      character.skills.forEach( skill =>{
      
        for (let index = 0; index < skill.damageInstances.length; index++) {
      
          let ability: number = skill.damageInstances[index].damageValues.mainSkillDamage /100;
          let sub : number = skill.damageInstances[index].damageValues.subSkillDamage;
          let res : number = 0;
          let bonus : number = 0;
        
            switch (skill.damageInstances[index].damageType) 
            {
              case "pyro":
                bonus  = this.charEntryData.extraStats.pyroDmgBonus/100;
                res = this.enemyData.enemyPyroDmgRes;
                break;
              case "cryo":
                bonus = this.charEntryData.extraStats.cryoDmgBonus/100;
                res = this.enemyData.enemyCryoDmgRes;
                  break;
              case "physical":
                bonus  = this.charEntryData.extraStats.physicalDmgBonus/100;
                res = this.enemyData.enemyPhysicalDmgRes;
                break;
              case "geo":
                bonus  = this.charEntryData.extraStats.geoDmgBonus/100;
                res = this.enemyData.enemyGeoDmgRes;
                break;
              case "anemo":
                bonus  = this.charEntryData.extraStats.anemoDmgBonus/100;
                res = this.enemyData.enemyAnemoDmgRes;
                break;    
              case "hydro":
                bonus  = this.charEntryData.extraStats.hydroDmgBonus/100;
                res = this.enemyData.enemyHydroDmgRes;
                break;
              case "electro":
                bonus  = this.charEntryData.extraStats.electroDmgBonus/100;
                res = this.enemyData.enemyElectroDmgRes;
                break;
              default:
                break;
              }
          let resmult: number = (( res /100) - (this.charEntryData.extraStats.resistanceShred /100));
                
          if(resmult < 0){
            resmult = 1 - (resmult/2);
            }
          else if(resmult >= 0 && resmult <= 0.75){
            resmult = 1 - resmult;
            }
          else{
            resmult = 1/(4*resmult+1);
            }
          
          if(skill == character.skills[0]){
            if (skill.damageInstances[index].damageType === "hp scaling") {
              this.skillDamage.normalAttack.push(this.damage.hp_scaling = ((this.charEntryData.totalHp * ability) + sub))
            }
            else if (skill.damageInstances[index].damageType === "healing") {
              this.skillDamage.normalAttack.push(this.damage.hp_scaling = ((this.charEntryData.totalHp * ability) + sub) * (1 + healingBonus))
            }
            else{
              this.skillDamage.normalAttack.push(this.damage.average_damage = ((attack)*(1 + bonus)*(ability)*(1 + (crtrate * crtdmg))*(((charlvl + 100))/((100 + charlvl) + (100 + enmlvl)*(1- defred))) *resmult))
            }
          }

             
          if(skill == character.skills[1]){
            if (skill.damageInstances[index].damageType === "hp scaling") {
              this.skillDamage.elementalSkill.push(this.damage.hp_scaling = ((this.charEntryData.totalHp * ability) + sub))
            }
            else if (skill.damageInstances[index].damageType === "healing") {
              this.skillDamage.elementalSkill.push(this.damage.hp_scaling = ((this.charEntryData.totalHp * ability) + sub) * (1 + healingBonus))
            }
            else{
              this.skillDamage.elementalSkill.push(this.damage.average_damage = ((attack)*(1 + bonus)*(ability)*(1 + (crtrate * crtdmg))*(((charlvl + 100))/((100 + charlvl) + (100 + enmlvl)*(1- defred))) *resmult))
            }
          }
             
          if(skill == character.skills[2]){
            if (skill.damageInstances[index].damageType === "hp scaling") {
              this.skillDamage.elementalBurst.push(this.damage.hp_scaling = ((this.charEntryData.totalHp * ability) + sub))
            }
            else if (skill.damageInstances[index].damageType === "healing") {
              this.skillDamage.elementalBurst.push(this.damage.hp_scaling = ((this.charEntryData.totalHp * ability) + sub) * (1 + healingBonus))
            }
            else{
              this.skillDamage.elementalBurst.push(this.damage.average_damage = ((attack)*(1 + bonus)*(ability)*(1 + (crtrate * crtdmg))*(((charlvl + 100))/((100 + charlvl) + (100 + enmlvl)*(1- defred))) *resmult))
            }
          }
        
        }
       }) 
      });  
    }
  }
}

