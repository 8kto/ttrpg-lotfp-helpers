import { t } from '@lingui/macro'

import { Dice } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MissileWeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const MissileWeaponItems = (): ReadonlyArray<MissileWeaponItem> => [
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 5,
    damage: null,
    details: t`config.missile.blowgun.details`,
    name: t`Blowgun`,
    points: EncumbrancePoint.Regular,
    range: { long: 80, medium: 50, short: 20 },
    ruralCostCp: null,
    type: WeaponType.Missile,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 45,
    damage: { dice: Dice.d6, x: 1 },
    name: t`Bow, Long`,
    points: EncumbrancePoint.Oversized,
    range: { long: 900, medium: 600, short: 50 },
    ruralCostCp: null,
    type: WeaponType.Missile,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 25,
    damage: { dice: Dice.d6, x: 1 },
    name: t`Bow, Short`,
    points: EncumbrancePoint.Regular,
    range: { long: 450, medium: 300, short: 50 },
    ruralCostCp: 25,
    type: WeaponType.Missile,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 30,
    damage: { dice: Dice.d8, x: 1 },
    details: t`Heavy crossbows can only be fired once in 3 rounds and ignore 4 AC points`,
    name: t`Crossbow, Heavy`,
    points: EncumbrancePoint.Oversized,
    range: { long: 600, medium: 200, short: 50 },
    ruralCostCp: null,
    type: WeaponType.Missile,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 25,
    damage: { dice: Dice.d6, x: 1 },
    details: t`Light crossbows can only be fired every once in 2 rounds and ignore 2 AC points`,
    name: t`Crossbow, Light`,
    points: EncumbrancePoint.Regular,
    range: { long: 400, medium: 150, short: 50 },
    ruralCostCp: null,
    type: WeaponType.Missile,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 0,
    damage: { dice: Dice.d2, x: 1 },
    details: t`A rock for throwing, not an ammunition`,
    name: t`Rock`,
    points: EncumbrancePoint.None,
    range: { long: 30, medium: 20, short: 10 },
    ruralCostCp: 0,
    type: WeaponType.Missile,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 1,
    damage: { dice: Dice.d4, x: 1 },
    details: t`Slings fired with stones instead of bullets have half the listed range.`,
    name: t`Sling`,
    points: EncumbrancePoint.None,
    range: { long: 450, medium: 300, short: 50 },
    ruralCostCp: 0.5,
    type: WeaponType.Missile,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 1,
    damage: { dice: Dice.d4, x: 1 },
    name: t`Dart`,
    points: EncumbrancePoint.Regular,
    range: { long: 30, medium: 20, short: 10 },
    ruralCostCp: null,
    type: WeaponType.Missile,
  },
  // AMMO
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 0.2,
    damage: null,
    details: t`Slings fired with stones instead of bullets have half the listed range.`,
    name: t`Sling bullets (10)`,
    points: EncumbrancePoint.Regular,
    range: { long: 450, medium: 300, short: 50 },
    ruralCostCp: 0.2,
    type: WeaponType.Ammunition,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 0,
    damage: null,
    details: t`config.melee.slingRocks.details`,
    name: t`Sling bullets, rocks (10)`,
    points: EncumbrancePoint.Regular,
    range: { long: 225, medium: 150, short: 25 },
    ruralCostCp: 0,
    type: WeaponType.Ammunition,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 0.5,
    damage: null,
    name: t`Arrow (1)`,
    points: EncumbrancePoint.None,
    range: null,
    ruralCostCp: 0.5,
    type: WeaponType.Ammunition,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 10,
    damage: null,
    name: t`Arrows, quiver (20)`,
    points: EncumbrancePoint.Regular,
    range: null,
    ruralCostCp: 10,
    type: WeaponType.Ammunition,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 0.5,
    damage: null,
    name: t`Crossbow bolt (1)`,
    points: EncumbrancePoint.None,
    range: null,
    ruralCostCp: 0.5,
    type: WeaponType.Ammunition,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 10,
    damage: null,
    name: t`Crossbow bolts, quiver (20)`,
    points: EncumbrancePoint.Regular,
    range: null,
    ruralCostCp: 10,
    type: WeaponType.Ammunition,
  },
  // Dart as an ammunition is taken from BFRPG Equipment Emporium 1e;
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 0.2,
    damage: { dice: Dice.d3, x: 1 },
    name: t`Dart for blowgun (1)`,
    points: EncumbrancePoint.None,
    range: null,
    ruralCostCp: 0.2,
    type: WeaponType.Ammunition,
  },
  {
    categoryKey: 'missileWeapons',
    cityCostCp: 4,
    damage: { dice: Dice.d3, x: 1 },
    name: t`Darts for blowgun, quiver (20)`,
    points: EncumbrancePoint.Regular,
    range: null,
    ruralCostCp: 4,
    type: WeaponType.Ammunition,
  },
]
