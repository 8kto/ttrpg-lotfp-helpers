import type { Dice, EquipmentItem } from '@/domain/index'

// TODO convert to class to utilize toString() for sort/serialization
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
  twoHanded?: boolean
  isSecondRank?: boolean
}

export interface MissileWeaponItem extends WeaponItem {
  range: Range | null
}

export type DamageDice = {
  x: number
  dice: Dice
}
