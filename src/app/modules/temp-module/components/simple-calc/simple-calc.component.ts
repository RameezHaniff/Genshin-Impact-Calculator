import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import {DamageResponse} from '../../../character/models/damage-response';
import { AttributeEntryComponent } from '../../../character/components/attribute-entry/attribute-entry.component';

@Component({
  selector: 'app-simple-calc',
  templateUrl: './simple-calc.component.html',
  styleUrls: ['./simple-calc.component.scss']
})

export class SimpleCalcComponent implements OnInit {

  constructor() { }

  damage : DamageResponse = new DamageResponse;

  @ViewChild('atk') atkInput: ElementRef|any;
  @ViewChild('ability') abilityInput: ElementRef|any;
  @ViewChild('bonus') bonusInput: ElementRef|any;
  @ViewChild('crtrate') crtrateInput: ElementRef|any;
  @ViewChild('crtdmg') crtdmgInput: ElementRef|any;
  @ViewChild('charlvl') charlvlInput: ElementRef|any;
  @ViewChild('enmlvl') enmlvlInput: ElementRef|any;
  @ViewChild('defred') defredInput: ElementRef|any;
  @ViewChild('enmres') enmresInput: ElementRef|any;
  @ViewChild('resshred') resshredInput: ElementRef|any;
  @ViewChild('elemental') elementalInput: ElementRef|any;
  @ViewChild('reactdmgbns') reactdmgbnsInput: ElementRef|any;

  ampmult: number = 0;
  transmult: number = 0;


  ngOnInit(): void {
  }
  
  reaction: string ='';

  selectReaction(event :any){
    this.reaction = event.target.value;
  }
  
  OutputDmg(){
    let attack: number = this.atkInput.nativeElement.value;
    let ability: number = this.abilityInput.nativeElement.value/100;
    let bonus: number = this.bonusInput.nativeElement.value/100;
    let crtrate: number = this.crtrateInput.nativeElement.value/100;
    let crtdmg: number = this.crtdmgInput.nativeElement.value/100;
    let charlvl: number = this.charlvlInput.nativeElement.value;
    let enmlvl: number = this.enmlvlInput.nativeElement.value;
    let defred: number = this.defredInput.nativeElement.value/100;
    let resmult: number = ((this.enmresInput.nativeElement.value/100) - (this.resshredInput.nativeElement.value/100));
    let elemental: number = this.elementalInput.nativeElement.value;
    let reactdmgbns: number = this.reactdmgbnsInput.nativeElement.value/100;
    
    if(resmult < 0){
      resmult = 1 - (resmult/2);
    }
    else if(resmult >= 0 && resmult <= 0.75){
      resmult = 1 - resmult;
    }
    else{
      resmult = 1/(4*resmult+1);
    }
      this.damage.average_damage = (attack)*(1 + bonus)*(ability)*(1 + (crtrate*crtdmg))*(((+charlvl + 100))/((100 + +charlvl) + (100 + +enmlvl)*(1-+defred))) *resmult;
      this.damage.crit_damage = (attack)*(1 + bonus)*(ability)*(1 + (1*crtdmg))*(((+charlvl + 100))/((100 + +charlvl) + (100 + +enmlvl)*(1-+defred))) *resmult;
      this.damage.noncrit_damage = (attack)*(1 + bonus)*(ability)*(1 + (0*crtdmg))*(((+charlvl + 100))/((100 + +charlvl) + (100 + +enmlvl)*(1-+defred))) *resmult;
      this.ampmult = 2.78 * (+elemental)/(+elemental+1400);
      this.transmult = 6.66 *(+elemental)/(+elemental+1400);

      switch(this.reaction){
        case "vaporize":
          this.damage.reaction_damage = 1.5 * this.damage.average_damage*(1+this.ampmult + reactdmgbns) ;
          break;
        case "revvaporize":
          this.damage.reaction_damage = 2 * this.damage.average_damage*(1+this.ampmult + reactdmgbns);
          this.damage.critreaction_damage = 2 * this.damage.crit_damage*(1+this.ampmult + reactdmgbns);
          this.damage.noncritreaction_damage = 2 * this.damage.noncrit_damage*(1+this.ampmult + reactdmgbns);
          break;
        case "melt":
          this.damage.reaction_damage = 2 * this.damage.average_damage*(1+this.ampmult + reactdmgbns);
          break;  
        case "revmelt":
          this.damage.reaction_damage = 1.5 * this.damage.average_damage*(1+this.ampmult + reactdmgbns);
          break;
        case "overload":
          this.damage.average_damage = 1.5 * this.damage.average_damage * 4 ;
          break;
        case "electrocharged":
          this.damage.average_damage = 1.5 * this.damage.average_damage;
          break;
        case "shatter":
          this.damage.average_damage = 1.5 * this.damage.average_damage;
          break;
        case "swirl":
          this.damage.average_damage = 1.5 * this.damage.average_damage;
          break;
        case "superconduct":
          this.damage.average_damage = 1.5 * this.damage.average_damage;
          break;
        case "crystallize":
          this.damage.average_damage = 1.5 * this.damage.average_damage;
           break;
        case "none":
          this.damage.average_damage = this.damage.average_damage;
          break;  
      }
    }


  Clear(){
    
  }
}

