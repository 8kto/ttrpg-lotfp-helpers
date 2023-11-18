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
    details:
      'This includes all sorts of fist wrappings and brass knuckle weapon types. ' +
      'Users suffer a –2 penalty to hit any opponent with an unadjusted AC of 15 or better.',
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
    details:
      'Use of this weapon requires an attack from surprise, or a successful grapple. ' +
      'If a hit is scored, the target is considered grappled and will take 1d6 damage per round.',
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
    details:
      'This weapon can be used one-handed if charging on horseback. ' +
      'Otherwise, it is effectively a polearm (pike)',
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
    details:
      'A successful hit with this weapon requires the victim to make a saving throw versus Paralysis. ' +
      'If unsuccessful, the victim is considered helpless, as is the wielder of the mancatcher ' +
      'while the target is being held for purposes of defending against attacks. ' +
      'This weapon must be wielded with two hands.',
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
    details:
      'This two-handed weapon can be used to attack from the second rank, ' +
      'can be used to receive a charge, and receives a +1 bonus to hit opponents with ' +
      'an unadjusted AC of 16 or better.',
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
    details:
      'This one handed weapon suffers a –2 penalty to hit opponents with an unadjusted AC of 15 or better.',
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
    details:
      'This can be used to attack from the second rank, and can be used to receive a charge.',
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
    twoHanded: true,
    type: WeaponType.Melee,
  },
  {
    cityCost: 50,
    damage: {
      dice: Dice.d10,
      x: 1,
    },
    details:
      'These weapons must be wielded with two hands. ' +
      'Two-handed swords, mauls, and great axes are included in this category.',
    name: 'Weapon, Great',
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
    details:
      'These are one-handed weapons, including swords, battle axes, maces',
    name: 'Weapon, Medium',
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
    details:
      'These are one-handed weapons, including short swords and hand axes',
    name: 'Weapon, Small',
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
    details:
      'These are small one-handed weapons including daggers and clubs, ' +
      'and suffer a –2 penalty to hit opponents with an unadjusted AC of 15 or better.',
    name: 'Weapon, Minor',
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
    details:
      'This weapon is ineffective against targets with unadjusted AC 14 or better, ' +
      "but allows mêlée attacks on opponents up to 10' away.",
    name: 'Whip',
    points: EncumbrancePoint.Regular,
    ruralCost: 25,
    type: WeaponType.Melee,
  },
]
