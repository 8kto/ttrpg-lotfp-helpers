import type { EquipmentItem } from '@/domain/equipment'
import type { FiringMechanism } from '@/domain/firearms'
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
  Firearms = 'Firearms',
  Ammunition = 'Ammunition',
}

export interface WeaponItem extends EquipmentItem {
  damage: DamageDice | null
  type: WeaponType
}

export interface MeleeWeaponItem extends WeaponItem {
  categoryKey: 'meleeWeapons'
  isAbleToReceiveCharge?: boolean
  isTwoHanded?: boolean
  isSecondRank?: boolean
}

export interface MissileWeaponItem extends WeaponItem {
  categoryKey: 'missileWeapons'
  range: Range | null
}

export interface FirearmWeaponItem extends WeaponItem {
  categoryKey: 'firearmWeapons'
  firingMechanism: FiringMechanism
  damageMelee: DamageDice | null
  range: Range
  isRiffled: boolean
  isTwoHanded?: boolean
}

export type DamageDice = {
  x: number
  dice: Dice
}
