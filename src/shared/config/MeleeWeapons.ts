import { Dice } from '@/shared/types'
import { EncumbrancePoint } from '@/shared/types/encumbrance'
import type { MeleeWeaponEntry } from '@/shared/types/weapon'

export const MeleeWeapons: Record<number, MeleeWeaponEntry> = {
  1: {
    cityCost: 10,
    damage: {
      dice: Dice.d3,
      x: 1,
    },
    id: 1,
    name: 'Cestus',
    points: EncumbrancePoint.None,
    ruralCost: null,
  },
  2: {
    cityCost: 5,
    damage: {
      dice: Dice.d6,
      x: 1,
    },
    id: 2,
    name: 'Garrote',
    points: EncumbrancePoint.None,
    ruralCost: null,
  },
  3: {
    cityCost: 30,
    damage: {
      dice: Dice.d10,
      x: 1,
    },
    id: 3,
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: 'Lance',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
  },
  4: {
    cityCost: 20,
    damage: null,
    id: 4,
    isAbleToReceiveCharge: false,
    name: 'Mancatcher',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
  },
  5: {
    cityCost: 30,
    damage: {
      dice: Dice.d8,
      x: 1,
    },
    id: 5,
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: 'Polearm',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
  },
  6: {
    cityCost: 15,
    damage: {
      dice: Dice.d8,
      x: 1,
    },
    id: 6,
    name: 'Rapier',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  7: {
    cityCost: 5,
    damage: {
      dice: Dice.d6,
      x: 1,
    },
    id: 7,
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: 'Spear',
    points: EncumbrancePoint.Regular,
    ruralCost: 3,
    twoHanded: false,
  },
  8: {
    cityCost: 5,
    damage: {
      dice: Dice.d4,
      x: 1,
    },
    id: 8,
    name: 'Staff',
    points: EncumbrancePoint.Regular,
    ruralCost: 3,
  },
  9: {
    cityCost: 50,
    damage: {
      dice: Dice.d10,
      x: 1,
    },
    id: 9,
    name: 'Weapon, Great: Two-handed sword, maul, great axe',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
  },
  10: {
    cityCost: 20,
    damage: {
      dice: Dice.d8,
      x: 1,
    },
    id: 10,
    name: 'Weapon, Medium: sword, battle axe, mace',
    points: EncumbrancePoint.Regular,
    ruralCost: 50,
    twoHanded: false,
  },
  11: {
    cityCost: 10,
    damage: {
      dice: Dice.d6,
      x: 1,
    },
    id: 11,
    name: 'Weapon, Small: short sword, hand axe',
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
  },
  12: {
    cityCost: 5,
    damage: {
      dice: Dice.d4,
      x: 1,
    },
    id: 12,
    name: 'Weapon, Minor: daggers, clubs',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  13: {
    cityCost: 10,
    damage: {
      dice: Dice.d3,
      x: 1,
    },
    id: 13,
    name: 'Whip',
    points: EncumbrancePoint.Regular,
    ruralCost: 25,
  },
}
