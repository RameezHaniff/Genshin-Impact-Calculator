import { Component, ElementRef, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import {DamageResponse} from '../../models/damage-response';
import { CharacterState } from '../../state/character.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Ability, CharacterResponse } from '../../models/character-data-response.model';
import {CardData} from 'src/app/modules/character/models/card-data.model'
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCharacter, GetCharacterInfo, SetEntryData } from '../../actions/character.actions';
import { CharacterInfo } from '../../models/character-data.model';
import { first } from 'rxjs/operators';
import { CharacterDataRequest } from '../../models/character-data-request.model';
import { SkillDamageArray } from '../../models/skill-damage-array.model';
import { CharacterEntryData } from '../../models/character-data-entry.model';
import { EnemyData } from '../../models/enemy-data-entry.model';
import { EntryData } from '../../models/entry-data.model';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss']
})


export class ResultDisplayComponent implements OnInit
{

@ViewChild('ability1') table1: MatTable<CardData>| any;
@ViewChild('ability2') table2: MatTable<CardData>| any;
@ViewChild('ability3') table3: MatTable<CardData>| any;

@Input() charId : number = 0;


instanceName1 : string [] = [];
instanceName2 : string [] = [];
instanceName3 : string [] = [];
skill1Data : CardData [] = [];
skill2Data : CardData [] = [];
skill3Data : CardData [] = [];
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
  
enemyData : EnemyData  = {
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



@Select(CharacterState.GetCharacter) character$: Observable<CharacterResponse> | undefined;
@Select(CharacterState.GetCharacterInfo) charInfo$: Observable<CharacterInfo> | undefined;
@Select(CharacterState.GetEntryData) entryData$ : Observable<EntryData> | undefined;

constructor(
  private _store : Store,
  private route: ActivatedRoute,
  private router: Router
  ) {}


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.charId = params['id'];
    });

    this.charRequest.characterID = this.charId;
    this.entryData$?.pipe().subscribe(x => {
      if (x) {
        this.charEntryData = x?.characterEntryData,
        this.enemyData = x?.enemyEntryData
        this.calculateStuff()
      }
     })
    this._store.dispatch([new GetCharacterInfo(this.charId), new GetCharacter(this.charRequest)]).pipe().subscribe(x => {
      this.character$?.pipe().subscribe(character => { 

          this.ability = [];
          this.instanceName1 = [];
          this.instanceName2 = [];
          this.instanceName3 = [];

          character.skills.forEach( skill => {
            this.ability.push(skill.ability)
          })
          for (let index = 0; index < character.skills[0].damageInstances.length; index++) {
            this.instanceName1.push(character.skills[0].damageInstances[index].damageInstanceName)
            }
          for (let index = 0; index < character.skills[1].damageInstances.length; index++) {
            this.instanceName2.push(character.skills[1].damageInstances[index].damageInstanceName)
            }
          for (let index = 0; index < character.skills[2].damageInstances.length; index++) {
            this.instanceName3.push(character.skills[2].damageInstances[index].damageInstanceName)
            }   
        })
        this.elementCheck();
        this.calculateStuff();
        for (let index = 0; index < this.instanceName1.length; index++) {
          this.skill1Data.push({instanceName : this.instanceName1[index] , damageValue: this.skillDamage.normalAttack[index]})
        }
        for (let index = 0; index < this.instanceName2.length; index++) {
          this.skill2Data.push({instanceName : this.instanceName2[index] , damageValue: this.skillDamage.elementalSkill[index]})
        }
        for (let index = 0; index < this.instanceName3.length; index++) {
          this.skill3Data.push({instanceName : this.instanceName3[index] , damageValue: this.skillDamage.elementalBurst[index]})
        }
        this.table1.renderRows()
        this.table2.renderRows()
        this.table3.renderRows()

    })
    this.updateElementalBurst(1)
    this.updateNormalAttack(1)
    this.updateElementalSkill(1)
  }

  displayedColumns: string[] = ['instanceName', 'damageValue'];

  damage = new DamageResponse;

  charRequest : CharacterDataRequest = {
    characterID: this.charId,
    normalAttackLevel: 1,
    elementalSkillLevel: 1,
    elementalBurstLevel: 1
  };

  ability: Ability[] = [];
  levels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  transMult = [9, 17, 40, 68, 104, 162, 245, 383, 540, 725];
  
  skillDamage : SkillDamageArray = {
    normalAttack: [],
    elementalBurst: [],
    elementalSkill: []
  };


  reaction: string ='';

 selectReaction(event : any){
   this.reaction = event;
   this.calculateStuff();
  }

  selectedDamage: string ='';

  selectDamage(event : any){
    this.selectedDamage = event;
    this.calculateStuff();
   }
  

 updateNormalAttack(event :any){

    this.charRequest.normalAttackLevel = +(event)
    this._store.dispatch(new GetCharacter(this.charRequest)).pipe().subscribe(x => { this.calculateStuff()
    })
  }

  updateElementalSkill(event: any){
    this.charRequest.elementalSkillLevel = +(event);
    this._store.dispatch(new GetCharacter(this.charRequest)).pipe().subscribe(x => { this.calculateStuff()
    })
  }

  updateElementalBurst(event: any){
    this.charRequest.elementalBurstLevel = +(event);
    this._store.dispatch(new GetCharacter(this.charRequest)).pipe().subscribe(x => { this.calculateStuff()
    })
  }
  

  SendData(){
    this.charRequest.characterID = this.charId;
    this._store.dispatch(new GetCharacter(this.charRequest))
  }

  elementFlag: string = '';
  
  elementCheck(){
    
        this.charInfo$?.pipe(first()).subscribe(character => { this.elementFlag = character.characterElement})
  }

  resistanceCalc(resmult : number){
    if(resmult < 0){
      resmult = 1 - (resmult/2);
      }
    else if(resmult >= 0 && resmult <= 0.75){
      resmult = 1 - resmult;
      }
    else{
      resmult = 1/(4*resmult+1);
      }
      return resmult;
  }
  
  public async calculateStuff(){

      this.skillDamage.normalAttack = [];
      this.skillDamage.elementalSkill = [];
      this.skillDamage.elementalBurst = [];

      let attack: number = this.charEntryData.totalAttack;
      let crtrate: number = 0;
      if (this.selectedDamage === "average") {
        crtrate = this.charEntryData.critRate /100;    
      }
      else if (this.selectedDamage === "crit") {
        crtrate = 1
      }
      else{
        crtrate = 0;
      }
      let crtdmg: number = this.charEntryData.critDamage /100;
      let charlvl: number = this.charEntryData.characterLevel;
      let enmlvl: number = this.enemyData.enemyLevel;
      let defred: number = this.enemyData.enemyDefReduction;
      let elemental: number = this.charEntryData.elementalMastery;
      let reactDmgBonus: number = this.charEntryData.extraStats.reactionDamageBonus /100;
      let healingBonus: number = this.charEntryData.healingBonus /100;
      let ampmult : number = 2.78 * (elemental)/(elemental+1400);
      let charLevel : number = this.charEntryData.characterLevel;
      let transformative : number = 0;
      let emBonus = 16 * (elemental/(elemental+2000)) / 100;
      let resmult : number = 0;

      if (charLevel === 0){
        transformative = 0;
      }
      else if (charLevel >= 1 && charLevel < 10) {
        transformative = this.transMult[0]
      }
      else if (charLevel >= 10 && charLevel < 20) {
        transformative = this.transMult[1]
      }
      else if (charLevel >= 20 &&  charLevel < 30) {
        transformative = this.transMult[2]
      }
      else if (charLevel >= 30 &&  charLevel < 40) {
        transformative = this.transMult[3]
      }
      else if (charLevel >= 40 &&  charLevel < 50) {
        transformative = this.transMult[4]
      }
      else if (charLevel >= 50 &&  charLevel < 60) {
        transformative = this.transMult[5]
      }
      else if (charLevel >= 60 &&  charLevel < 70) {
        transformative = this.transMult[6]
      }
      else if (charLevel >= 70 &&  charLevel < 80) {
        transformative = this.transMult[7]
      }
      else if (charLevel >= 80 &&  charLevel < 80) {
        transformative = this.transMult[8]
      }
      else if(charLevel === 90){
        transformative = this.transMult[9]
      }

      resmult = (( this.enemyData.enemyPhysicalDmgRes /100) - (this.charEntryData.extraStats.resistanceShred /100));
      resmult = this.resistanceCalc(resmult);
      this.damage.shattered = 3 * transformative * (1 + emBonus + reactDmgBonus);

      if (this.elementFlag === "Cryo" || this.elementFlag === "Electro") {

        resmult = (( this.enemyData.enemyCryoDmgRes /100) - (this.charEntryData.extraStats.resistanceShred /100));
        resmult = this.resistanceCalc(resmult);   
        this.damage.superconduct = (1 * transformative * (1 + emBonus + reactDmgBonus)) * resmult;   

      }

      if (this.elementFlag === "Anemo") {

        resmult = (( this.enemyData.enemyAnemoDmgRes /100) - (this.charEntryData.extraStats.resistanceShred /100));
        resmult = this.resistanceCalc(resmult);
        this.damage.swirl = 1.2 * transformative * (1 + emBonus + reactDmgBonus)

      }
      if (this.elementFlag === "Hydro" || this.elementFlag === "Electro") {

        resmult = (( this.enemyData.enemyElectroDmgRes /100) - (this.charEntryData.extraStats.resistanceShred /100));
        resmult = this.resistanceCalc(resmult);
        this.damage.electrocharged = 2.4 * transformative * (1 + emBonus + reactDmgBonus)

      }

      if (this.elementFlag === "Pyro" || this.elementFlag == "Electro") {

        resmult = (( this.enemyData.enemyPyroDmgRes /100) - (this.charEntryData.extraStats.resistanceShred /100));
        resmult = this.resistanceCalc(resmult);
        this.damage.overload = 4 * transformative * (1 + emBonus + reactDmgBonus) * resmult;
      }


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
          resmult = (( res /100) - (this.charEntryData.extraStats.resistanceShred /100));
          resmult = this.resistanceCalc(resmult);     
          
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
       for (let index = 0; index < this.skillDamage.normalAttack.length; index++) {


        if(this.reaction ==="vaporize" && character.skills[0].damageInstances[index].damageType === "pyro" ){
            this.skillDamage.normalAttack[index] = 1.5 * this.skillDamage.normalAttack[index] * (1+ ampmult + reactDmgBonus)
         }
         else if(this.reaction ==="revvaporize" && character.skills[0].damageInstances[index].damageType === "hydro" ){
           this.skillDamage.normalAttack[index] = 2 * this.skillDamage.normalAttack[index]* (1+ ampmult + reactDmgBonus)
         } 
         else if(this.reaction ==="melt" && character.skills[0].damageInstances[index].damageType === "pyro" ){
           this.skillDamage.normalAttack[index] = 2 * this.skillDamage.normalAttack[index] * (1+ ampmult + reactDmgBonus)
         }
         else if(this.reaction ==="revmelt" && character.skills[0].damageInstances[index].damageType === "cryo" ){
           this.skillDamage.normalAttack[index] = 1.5 * this.skillDamage.normalAttack[index] * (1+ ampmult + reactDmgBonus)
         }
         else{
           this.skillDamage.normalAttack = this.skillDamage.normalAttack;
         }               
       }
       
       for (let index = 0; index < this.skillDamage.elementalSkill.length; index++) {


        if(this.reaction ==="vaporize" && character.skills[1].damageInstances[index].damageType === "pyro" ){
            this.skillDamage.elementalSkill[index] = 1.5 * this.skillDamage.elementalSkill[index] * (1+ ampmult + reactDmgBonus)
         }
         else if(this.reaction ==="revvaporize" && character.skills[1].damageInstances[index].damageType === "hydro" ){
           this.skillDamage.elementalSkill[index] = 2 * this.skillDamage.elementalSkill[index]* (1+ ampmult + reactDmgBonus)
         } 
         else if(this.reaction ==="melt" && character.skills[1].damageInstances[index].damageType === "pyro" ){
           this.skillDamage.elementalSkill[index] = 2 * this.skillDamage.elementalSkill[index] * (1+ ampmult + reactDmgBonus)
         }
         else if(this.reaction ==="revmelt" && character.skills[1].damageInstances[index].damageType === "cryo" ){
           this.skillDamage.elementalSkill[index] = 1.5 * this.skillDamage.elementalSkill[index] * (1+ ampmult + reactDmgBonus)
         }
         else{
           this.skillDamage.elementalSkill = this.skillDamage.elementalSkill;
         }               
       }
       
       for (let index = 0; index < this.skillDamage.elementalBurst.length; index++) {


        if(this.reaction ==="vaporize" && character.skills[2].damageInstances[index].damageType === "pyro" ){
            this.skillDamage.elementalBurst[index] = 1.5 * this.skillDamage.elementalBurst[index] * (1+ ampmult + reactDmgBonus)
         }
         else if(this.reaction ==="revvaporize" && character.skills[2].damageInstances[index].damageType === "hydro" ){
           this.skillDamage.elementalBurst[index] = 2 * this.skillDamage.elementalBurst[index]* (1+ ampmult + reactDmgBonus)
         } 
         else if(this.reaction ==="melt" && character.skills[2].damageInstances[index].damageType === "pyro" ){
           this.skillDamage.elementalBurst[index] = 2 * this.skillDamage.elementalBurst[index] * (1+ ampmult + reactDmgBonus)
         }
         else if(this.reaction ==="revmelt" && character.skills[2].damageInstances[index].damageType === "cryo" ){
           this.skillDamage.elementalBurst[index] = 1.5 * this.skillDamage.elementalBurst[index] * (1+ ampmult + reactDmgBonus)
         }
         else{
           this.skillDamage.elementalBurst = this.skillDamage.elementalBurst;
         }               
       }
      })
      

      this.skill1Data.map((x, index) => 
          {
            let value = this.skillDamage.normalAttack[index]
            x.damageValue = this.skillDamage.normalAttack[index]
          })
          this.skill2Data.map((x, index) => 
          {
            let value = this.skillDamage.normalAttack[index]
            x.damageValue = this.skillDamage.elementalSkill[index]
          })
          this.skill3Data.map((x, index) => 
          {
            let value = this.skillDamage.normalAttack[index]
            x.damageValue = this.skillDamage.elementalBurst[index]
          })
      
      console.log(this.skillDamage.normalAttack)    
      console.log(this.skill1Data)

      this.table1.renderRows()
      this.table2.renderRows()
      this.table3.renderRows()
  }
 }

