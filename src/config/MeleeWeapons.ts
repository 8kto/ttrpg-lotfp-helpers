import { msg } from '@lingui/macro'

import type { EquipmentItemTranslated } from '@/config/types'
import { Dice } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const MeleeWeapons: ReadonlyArray<
  EquipmentItemTranslated<MeleeWeaponItem>
> = [
  {
    cityCost: 10,
    damage: {
      dice: Dice.d3,
      x: 1,
    },
    details: msg`This includes all sorts of fist wrappings and brass knuckle weapon types. Users suffer a –2 penalty to hit any opponent with an unadjusted AC of 15 or better.`,
    name: msg`Cestus`,
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
    details: msg`Use of this weapon requires an attack from surprise, or a successful grapple. If a hit is scored, the target is considered grappled and will take 1d6 damage per round.`,
    name: msg`Garrote`,
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
    details: msg`This weapon can be used one-handed if charging on horseback. Otherwise, it is effectively a polearm (pike)`,
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: msg`Lance`,
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
    type: WeaponType.Melee,
  },
  {
    cityCost: 20,
    damage: null,
    details: msg`${
      `A successful hit with this weapon requires the victim to make a saving throw versus Paralysis. ` +
      `If unsuccessful, the victim is considered helpless, as is the wielder of the mancatcher ` +
      `while the target is being held for purposes of defending against attacks. ` +
      `This weapon must be wielded with two hands.`
    }`,
    isAbleToReceiveCharge: false,
    name: msg`Mancatcher`,
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
    details: msg`${
      `This two-handed weapon can be used to attack from the second rank, ` +
      `can be used to receive a charge, and receives a +1 bonus to hit opponents with ` +
      `an unadjusted AC of 16 or better.`
    }`,
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: msg`Polearm`,
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
    details: msg`${`This one handed weapon suffers a –2 penalty to hit opponents with an unadjusted AC of 15 or better.`}`,
    name: msg`Rapier`,
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
    details: msg`${`This can be used to attack from the second rank, and can be used to receive a charge.`}`,
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: msg`Spear`,
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
    name: msg`Staff`,
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
    details: msg`${
      `These weapons must be wielded with two hands. ` +
      `Two-handed swords, mauls, and great axes are included in this category.`
    }`,
    name: msg`Weapon, Great`,
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
    details: msg`${`These are one-handed weapons, including swords, battle axes, maces`}`,
    name: msg`Weapon, Medium`,
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
    details: msg`These are one-handed weapons, including short swords and hand axes`,
    name: msg`Weapon, Small`,
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
    details: msg`${
      `These are small one-handed weapons including daggers and clubs, ` +
      `and suffer a –2 penalty to hit opponents with an unadjusted AC of 15 or better.`
    }`,
    name: msg`Weapon, Minor`,
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
    details: msg`${
      `This weapon is ineffective against targets with unadjusted AC 14 or better, ` +
      'but allows mêlée attacks on opponents up to 10` away.'
    }`,
    name: msg`Whip`,
    points: EncumbrancePoint.Regular,
    ruralCost: 25,
    type: WeaponType.Melee,
  },
  /* CUSTOM: concrete weapons for each of Great/Medium etc. categories */
  /* Great */
  {
    cityCost: 50,
    damage: {
      dice: Dice.d10,
      x: 1,
    },
    name: msg`Two-handed sword`,
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
    type: WeaponType.Great,
  },
  {
    cityCost: 50,
    damage: {
      dice: Dice.d10,
      x: 1,
    },
    name: msg`Maul`,
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
    type: WeaponType.Great,
  },
  {
    cityCost: 50,
    damage: {
      dice: Dice.d10,
      x: 1,
    },
    name: msg`Great axe`,
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
    type: WeaponType.Great,
  },
  /* Medium */
  {
    cityCost: 20,
    damage: {
      dice: Dice.d8,
      x: 1,
    },
    name: msg`Sword`,
    points: EncumbrancePoint.Regular,
    ruralCost: 50,
    twoHanded: false,
    type: WeaponType.Medium,
  },
  {
    cityCost: 20,
    damage: {
      dice: Dice.d8,
      x: 1,
    },
    name: msg`Battle axe`,
    points: EncumbrancePoint.Regular,
    ruralCost: 50,
    twoHanded: false,
    type: WeaponType.Medium,
  },
  {
    cityCost: 20,
    damage: {
      dice: Dice.d8,
      x: 1,
    },
    name: msg`Mace`,
    points: EncumbrancePoint.Regular,
    ruralCost: 50,
    twoHanded: false,
    type: WeaponType.Medium,
  },
  /* Small */
  {
    cityCost: 10,
    damage: {
      dice: Dice.d6,
      x: 1,
    },
    name: msg`Short sword`,
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
    type: WeaponType.Small,
  },
  {
    cityCost: 10,
    damage: {
      dice: Dice.d6,
      x: 1,
    },
    name: msg`Hand axe`,
    points: EncumbrancePoint.Regular,
    ruralCost: 10,
    type: WeaponType.Small,
  },
  /* Minor */
  {
    cityCost: 5,
    damage: {
      dice: Dice.d4,
      x: 1,
    },
    details: msg`This weapon suffers a –2 penalty to hit opponents with an unadjusted AC of 15 or better.`,
    name: msg`Dagger`,
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
    type: WeaponType.Minor,
  },
  {
    cityCost: 5,
    damage: {
      dice: Dice.d4,
      x: 1,
    },
    details: msg`This weapon suffers a –2 penalty to hit opponents with an unadjusted AC of 15 or better.`,
    name: msg`Club`,
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
    type: WeaponType.Minor,
  },
]
