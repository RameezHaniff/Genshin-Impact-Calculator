export interface CharacterData{
    characterName : string;
    characterId : number;
    rarity : Rarity;
    weaponType : WeaponType;
    element: Element;
}

interface Rarity{
    rarityName: string;
    rarityId: number;
}

interface WeaponType{
    weaponTypeId : number;
    weaponTypeName : string;
}

interface Element{
    elementId : number;
    elementName : string;
}