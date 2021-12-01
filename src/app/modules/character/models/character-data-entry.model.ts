

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
