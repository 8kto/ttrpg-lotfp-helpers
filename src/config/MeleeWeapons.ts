import { Dice } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MeleeWeaponEntry } from '@/domain/weapon'

export const MeleeWeapons: ReadonlyArray<MeleeWeaponEntry> = [
  {
    cityCost: 10,
    damage: {
      dice: Dice.d3,
      x: 1,
    },
    name: 'Cestus',
    points: EncumbrancePoint.None,
    ruralCost: null,
  },
  {
    cityCost: 5,
    damage: {
      dice: Dice.d6,
      x: 1,
    },
    name: 'Garrote',
    points: EncumbrancePoint.None,
    ruralCost: null,
  },
  {
    cityCost: 30,
    damage: {
      dice: Dice.d10,
      x: 1,
    },
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: 'Lance',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
  },
  {
    cityCost: 20,
    damage: null,
    isAbleToReceiveCharge: false,
    name: 'Mancatcher',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
  },
  {
    cityCost: 30,
    damage: {
      dice: Dice.d8,
      x: 1,
    },
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: 'Polearm',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
  },
  {
    cityCost: 15,
    damage: {
      dice: Dice.d8,
      x: 1,
    },
    name: 'Rapier',
    points: EncumbrancePoint.Regular,
    ruralCost: null,
  },
  {
    cityCost: 5,
    damage: {
      dice: Dice.d6,
      x: 1,
    },
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: 'Spear',
    points: EncumbrancePoint.Regular,
    ruralCost: 3,
    twoHanded: false,
  },
  {
    cityCost: 5,
    damage: {
      dice: Dice.d4,
      x: 1,
    },
    name: 'Staff',
    points: EncumbrancePoint.Regular,
    ruralCost: 3,
  },
  {
    cityCost: 50,
    damage: {
      dice: Dice.d10,
      x: 1,
    },
    name: 'Weapon, Great: Two-handed sword, maul, great axe',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
  },
  {
    cityCost: 20,
    damage: {
      dice: Dice.d8,
      x: 1,
    },
    name: 'Weapon, Medium: sword, battle axe, mace',
    points: EncumbrancePoint.Regular,
    ruralCost: 50,
    twoHanded: false,
  },
  {
    cityCost: 10,
    damage: {
      dice: Dice.d6,
      x: 1,
    },
    name: 'Weapon, Small: short sword, hand axe',
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
  },
  {
    cityCost: 5,
    damage: {
      dice: Dice.d4,
      x: 1,
    },
    name: 'Weapon, Minor: daggers, clubs',
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
  },
  {
    cityCost: 10,
    damage: {
      dice: Dice.d3,
      x: 1,
    },
    name: 'Whip',
    points: EncumbrancePoint.Regular,
    ruralCost: 25,
  },
]
