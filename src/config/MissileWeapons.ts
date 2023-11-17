import { Dice } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MissileWeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const MissileWeapons: ReadonlyArray<MissileWeaponItem> = [
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
    details: 'Heavy crossbows can only be fired once in 3 rounds and ignore 4 AC points',
    name: 'Crossbow, Heavy',
    points: EncumbrancePoint.Oversized,
    range: { long: 600, medium: 200, short: 50 },
    ruralCost: null,
    type: WeaponType.Missile,
  },
  {
    cityCost: 25,
    damage: { dice: Dice.d6, x: 1 },
    details: 'Light crossbows can only be fired every once in 2 rounds and ignore 2 AC points',
    name: 'Crossbow, Light',
    points: EncumbrancePoint.Regular,
    range: { long: 400, medium: 150, short: 50 },
    ruralCost: null,
    type: WeaponType.Missile,
  },
  {
    cityCost: 0,
    damage: { dice: Dice.d2, x: 1 },
    details: 'A rock for throwing, not an ammunition',
    name: 'Rock',
    points: EncumbrancePoint.None,
    range: { long: 30, medium: 20, short: 10 },
    ruralCost: 0,
    type: WeaponType.Missile,
  },
  {
    cityCost: 1,
    damage: { dice: Dice.d4, x: 1 },
    details:
      'Slings fired with stones instead of bullets have half the listed range.',
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
  // AMMO
  {
    cityCost: 0.2,
    damage: null,
    details:
      'Slings fired with stones instead of bullets have half the listed range.',
    name: 'Sling bullets (10)',
    points: EncumbrancePoint.Regular,
    range: { long: 450, medium: 300, short: 50 },
    ruralCost: 0.2,
    type: WeaponType.Ammunition,
  },
  {
    cityCost: 0,
    damage: null,
    details:
      'Slings fired with stones instead of bullets have the listed range (half of the regular).',
    name: 'Sling bullets, rocks (10)',
    points: EncumbrancePoint.Regular,
    range: { long: 225, medium: 150, short: 25 },
    ruralCost: 0,
    type: WeaponType.Ammunition,
  },
  {
    cityCost: 0.5,
    damage: null,
    name: 'Arrow (1)',
    points: EncumbrancePoint.None,
    range: null,
    ruralCost: 0.5,
    type: WeaponType.Ammunition,
  },
  {
    cityCost: 10,
    damage: null,
    name: 'Arrows, quiver (20)',
    points: EncumbrancePoint.Regular,
    range: null,
    ruralCost: 10,
    type: WeaponType.Ammunition,
  },
  {
    cityCost: 0.5,
    damage: null,
    name: 'Crossbow bolt (1)',
    points: EncumbrancePoint.None,
    range: null,
    ruralCost: 0.5,
    type: WeaponType.Ammunition,
  },
  {
    cityCost: 10,
    damage: null,
    name: 'Crossbow bolts, quiver (20)',
    points: EncumbrancePoint.Regular,
    range: null,
    ruralCost: 10,
    type: WeaponType.Ammunition,
  },
]
