import { t } from '@lingui/macro'

import type { EquipmentItemTranslated } from '@/config/types'
import { Dice } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const MeleeWeapons = (): ReadonlyArray<
  EquipmentItemTranslated<MeleeWeaponItem>
> => [
  {
    cityCost: 10,
    damage: {
      dice: Dice.d3,
      x: 1,
    },
    details: t`config.melee.cestus.details`,
    name: t`Cestus`,
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
    details: t`Use of this weapon requires an attack from surprise, or a successful grapple. If a hit is scored, the target is considered grappled and will take 1d6 damage per round.`,
    name: t`Garrote`,
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
    details: t`This weapon can be used one-handed if charging on horseback. Otherwise, it is effectively a polearm (pike)`,
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: t`Lance`,
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    twoHanded: true,
    type: WeaponType.Melee,
  },
  {
    cityCost: 20,
    damage: null,
    details: t`config.melee.mancatcher.details`,
    isAbleToReceiveCharge: false,
    name: t`Mancatcher`,
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
    details: t`config.melee.polearm.details`,
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: t`Polearm`,
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
    details: t`This one handed weapon suffers a –2 penalty to hit opponents with an unadjusted AC of 15 or better.`,
    name: t`Rapier`,
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
    details: t`This can be used to attack from the second rank, and can be used to receive a charge.`,
    isAbleToReceiveCharge: true,
    isSecondRank: true,
    name: t`Spear`,
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
    name: t`Staff`,
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
    details: t`These weapons must be wielded with two hands. Two-handed swords, mauls, and great axes are included in this category.`,
    name: t`Weapon, Great`,
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
    details: t`These are one-handed weapons, including swords, battle axes, maces`,
    name: t`Weapon, Medium`,
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
    details: t`These are one-handed weapons, including short swords and hand axes`,
    name: t`Weapon, Small`,
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
    details: t`These are small one-handed weapons including daggers and clubs, and suffer a –2 penalty to hit opponents with an unadjusted AC of 15 or better.`,
    name: t`Weapon, Minor`,
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
    details: t`This weapon is ineffective against targets with unadjusted AC 14 or better, but allows mêlée attacks on opponents up to 10 ft away.`,
    name: t`Whip`,
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
    name: t`Two-handed sword`,
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
    name: t`Maul`,
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
    name: t`Great axe`,
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
    name: t`Sword`,
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
    name: t`Battle axe`,
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
    name: t`Mace`,
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
    name: t`Short sword`,
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
    name: t`Hand axe`,
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
    details: t`This weapon suffers a –2 penalty to hit opponents with an unadjusted AC of 15 or better.`,
    name: t`Dagger`,
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
    details: t`This weapon suffers a –2 penalty to hit opponents with an unadjusted AC of 15 or better.`,
    name: t`Club`,
    points: EncumbrancePoint.Regular,
    ruralCost: 5,
    type: WeaponType.Minor,
  },
]

// TODO extend polearms
