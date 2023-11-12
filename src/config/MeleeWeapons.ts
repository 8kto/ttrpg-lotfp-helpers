import { Dice } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const MeleeWeapons: ReadonlyArray<MeleeWeaponItem> = [
  {
    cityCost: 10,
    damage: {
      dice: Dice.d3,
      x: 1,
    },
    name: 'Cestus',
    points: EncumbrancePoint.None,
    ruralCost: null,
    type: WeaponType.Melee,
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
    type: WeaponType.Melee,
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
    type: WeaponType.Melee,
  },
  {
    cityCost: 20,
    damage: null,
    isAbleToReceiveCharge: false,
    name: 'Mancatcher',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
    type: WeaponType.Melee,
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
    type: WeaponType.Melee,
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
    type: WeaponType.Melee,
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
    type: WeaponType.Melee,
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
    type: WeaponType.Melee,
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
    type: WeaponType.Great,
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
    type: WeaponType.Medium,
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
    type: WeaponType.Small,
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
    type: WeaponType.Minor,
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
    type: WeaponType.Melee,
  },
]
