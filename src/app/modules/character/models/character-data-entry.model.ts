

export interface CharacterEntryData{

    totalHp : number;
    totalAttack: number;
    baseAttack: number;
    totalDefense: number;
    elementalMastery: number;
    critRate: number;
    critDamage: number;
    energyRecharge: number;
    healingBonus: number;
    extraStats: ExtraStats;
    otherDmgBonus: OtherDmgBonus;
    characterLevel: number;

    // constructor(){
    //     this.totalHp = 0;
    //     this.totalAttack = 0;
    //     this.baseAttack = 0;
    //     this.totalDefense = 0;
    //     this.critRate = 0;
    //     this.critDamage = 0;
    //     this.energyRecharge = 0;
    //     this.healingBonus = 0;
    //     this.characterLevel = 0;
    //     extraStats: ExtraStats;
    //     otherDmgBonus: OtherDmgBonus;
    //     skillLevel : SkillLevel;
    //     characterLevel: number;
    // }
}

interface ExtraStats{
    physicalDmgBonus: number;
    physicalDmgRes: number;
    anemoDmgBonus: number;
    anemoDmgRes: number;
    geoDmgBonus: number;
    geoDmgRes: number;
    electroDmgBonus: number;
    electroDmgRes: number;
    hydroDmgBonus: number;
    hydroDmgRes: number;
    pyroDmgBonus: number;
    pyroDmgRes: number;
    cryoDmgBonus: number;
    cryoDmgRes: number;
    resistanceShred: number;
    reactionDamageBonus: number;
    stamina: number;
    incomingHealingBonus: number;
    shieldStrength: number;
    cdReduction: number;

    // constructor(){
    //     this.physicalDmgBonus = 0;
    //     this.physicalDmgRes = 0;
    //     this.anemoDmgBonus = 0;
    //     this.anemoDmgRes = 0;
    //     this.electroDmgBonus = 0;
    //     this.electroDmgRes = 0;
    //     this.hydroDmgBonus = 0;
    //     this.hydroDmgRes = 0;
    //     this.pyroDmgRes = 0;
    //     this.pyroDmgBonus = 0;
    //     this.cryoDmgBonus = 0;
    //     this.cryoDmgRes = 0;
    //     this.stamina = 100;
    //     this.incomingHealingBonus = 0;
    //     this.shieldStrength = 0;
    //     this.cdReduction = 0;
    // }
}

interface OtherDmgBonus{
    normalAttackDmgBonus : number;
    normalAttackCritRateBonus: number;
    chargedAttackDmgBonus : number;
    chargedAttackCritRateBonus: number;
    plungeAttackDmgBonus : number;
    plungeAttackCritRateBonus: number;
    elementalSkillDmgBonus : number;
    elementalSkillCritRateBonus: number;
    elementalBurstDmgBonus : number;
    elementalBurstCritRateBonus: number;
    allDmgBonus: number;
    reactionDamageBonus: number;
    movementSpeedBonus: number;
    attackSpeedBonus: number;
    weakspotDmgBonus: number;
}
