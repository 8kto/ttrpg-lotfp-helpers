import { Dice } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MissileWeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const MissileWeapons: Array<MissileWeaponItem> = [
  {
    cityCost: 5,
    damage: null,
    name: 'Blowgun',
    points: EncumbrancePoint.Regular,
    range: { long: 80, medium: 50, short: 20 },
    ruralCost: null,
    type: WeaponType.Missile,
  },
  {
    cityCost: 45,
    damage: { dice: Dice.d6, x: 1 },
    name: 'Bow, Long',
    points: EncumbrancePoint.Oversized,
    range: { long: 900, medium: 600, short: 50 },
    ruralCost: null,
    type: WeaponType.Missile,
  },
  {
    cityCost: 25,
    damage: { dice: Dice.d6, x: 1 },
    name: 'Bow, Short',
    points: EncumbrancePoint.Regular,
    range: { long: 450, medium: 300, short: 50 },
    ruralCost: 25,
    type: WeaponType.Missile,
  },
  {
    cityCost: 30,
    damage: { dice: Dice.d8, x: 1 },
    name: 'Crossbow, Heavy',
    points: EncumbrancePoint.Oversized,
    range: { long: 600, medium: 200, short: 50 },
    ruralCost: null,
    type: WeaponType.Missile,
  },
  {
    cityCost: 25,
    damage: { dice: Dice.d6, x: 1 },
    name: 'Crossbow, Light',
    points: EncumbrancePoint.Regular,
    range: { long: 400, medium: 150, short: 50 },
    ruralCost: null,
    type: WeaponType.Missile,
  },
  {
    cityCost: 0,
    damage: { dice: Dice.d2, x: 1 },
    name: 'Rock',
    points: EncumbrancePoint.None,
    range: { long: 30, medium: 20, short: 10 },
    ruralCost: null,
    type: WeaponType.Missile,
  },
  {
    cityCost: 1,
    damage: { dice: Dice.d4, x: 1 },
    name: 'Sling',
    points: EncumbrancePoint.None,
    range: { long: 450, medium: 300, short: 50 },
    ruralCost: 0.5,
    type: WeaponType.Missile,
  },
  {
    cityCost: 1,
    damage: { dice: Dice.d4, x: 1 },
    name: 'Dart',
    points: EncumbrancePoint.Regular,
    range: { long: 30, medium: 20, short: 10 },
    ruralCost: null,
    type: WeaponType.Missile,
  },
  // TODO handle that
  // {
  //   cityCost: 5,
  //   damage: { dice: Dice.d6, x: 1 },
  //   name: 'Spear',
  //   points: EncumbrancePoint.Regular,
  //   range: { long: 60, medium: 20, short: 10 },
  //   ruralCost: 3,
  //   type: WeaponType.Missile,
  // },
]
