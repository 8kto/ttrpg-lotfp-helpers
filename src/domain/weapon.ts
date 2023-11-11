import type { Dice, EquipmentItem } from '@/domain/index'

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
  // Missiles: bow, crossbow, sling etc.
  Missile = 'Missile',
}

export interface WeaponEntry extends EquipmentItem {
  damage: DamageDice | null
  type: WeaponType
  details?: string
}

export interface MeleeWeaponEntry extends WeaponEntry {
  isAbleToReceiveCharge?: boolean
  twoHanded?: boolean
  isSecondRank?: boolean
}

export interface MissileWeaponEntry extends WeaponEntry {
  range: Range
}

export type DamageDice = {
  x: number
  dice: Dice
}
