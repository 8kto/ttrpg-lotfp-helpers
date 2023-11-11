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
  MeleeWeapon = 'MeleeWeapon',
  // Missiles: bow, crossbow, sling etc.
  MissileWeapon = 'MissileWeapon',
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
