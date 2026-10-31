import type { EquipmentItem } from '@/domain/equipment'

export enum ArmorType {
  Armor = 'Armor',
  Barding = 'Barding',
  Shield = 'Shield',
  // Pieces adding a bonus to AC or saves instead of setting the base AC
  Accessory = 'Accessory',
}

/**
 * AC bonus split by attack type: a shield gives +1 vs mêlée, +2 vs missiles
 */
export type ArmorClassBonus = {
  melee: number
  missile: number
}

export interface ArmorItem extends EquipmentItem {
  type: ArmorType
  // Displayed value: the base AC (14) or a bonus ('+1')
  armorClass: number | string
  categoryKey: 'armor'
  // Numeric AC bonus for calculations, for shields and accessories
  armorClassBonus?: ArmorClassBonus
  // Bonus to saving throws involving physical damage (helmets)
  physicalSaveBonus?: number
}
