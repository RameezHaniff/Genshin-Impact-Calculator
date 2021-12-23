export class DamageResponse{
    average_damage: number;
    crit_damage: number;
    noncrit_damage: number;
    reaction_damage: number;
    critreaction_damage: number;
    noncritreaction_damage: number;
    hp_scaling: number;
    overload : number;
    superconduct : number;
    electrocharged : number;
    shattered : number;
    swirl : number;


    constructor(){
        this.average_damage= 0;
        this.crit_damage = 0;
        this.noncrit_damage = 0;
        this.reaction_damage = 0;
        this.critreaction_damage = 0;
        this.noncritreaction_damage = 0;
        this.hp_scaling = 0;
        this.overload = 0;
        this.superconduct = 0;
        this.electrocharged = 0;
        this.shattered = 0;
        this.swirl = 0;      
    }

}