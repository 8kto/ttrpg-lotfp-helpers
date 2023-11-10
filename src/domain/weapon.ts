import type { Dice, EquipmentItem } from '@/domain/index'

export type Range = {
  short: number
  medium: number
  long: number
}

export interface WeaponEntry extends EquipmentItem {
  damage: DamageDice | null
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
