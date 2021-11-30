
export interface CharacterResponse{

        skills: Skills[];
    }

    interface Skills
    {
         ability: Ability;

         damageInstances : DamageInstance[];
    }

export  interface Ability{

        abilityName : string;

        abilityId : number;

        cooldown : any;

        energyCost: any;
    }

    interface DamageInstance
    {
        damageInstanceName: string;

        damageValues: Level;

        damageType : string;
    }

    interface Level{

        mainSkillDamage: number;

        subSkillDamage: number;
    }
