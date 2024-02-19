import type { EquipmentItem } from '@/domain/equipment'
import type { Dice } from '@/domain/index'

export type Range = {
  short: number
  medium: number
  long: number
}

export enum WeaponType {
  // These 4 are melee only
  Minor = 'Minor',
  Small = 'Small',
  Medium = 'Medium',
  Great = 'Great',
  // General type for any other melee weapon
  Melee = 'Melee',
  // Missiles: bow, crossbow, sling, darts etc.
  Missile = 'Missile',
  Ammunition = 'Ammunition',
}

export interface WeaponItem extends EquipmentItem {
  damage: DamageDice | null
  type: WeaponType
}

export interface MeleeWeaponItem extends WeaponItem {
  isAbleToReceiveCharge?: boolean
  isTwoHanded?: boolean
  isSecondRank?: boolean
  categoryKey: 'meleeWeapons'
}

export interface MissileWeaponItem extends WeaponItem {
  range: Range | null
  categoryKey: 'missileWeapons'
}

export type DamageDice = {
  x: number
  dice: Dice
}
