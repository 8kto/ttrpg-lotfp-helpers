import type { ArmorItem } from '@/domain/armor'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type { MissileWeaponItem, WeaponItem } from '@/domain/weapon'

export const isArmorItem = (item: EquipmentItem): item is ArmorItem => {
  return 'armorClass' in item
}

export const isWeaponItem = (item: EquipmentItem): item is WeaponItem => {
  return 'damage' in item && !!item.damage
}

export const isMissileItem = (
  item: EquipmentItem,
): item is MissileWeaponItem => {
  return 'range' in item && !!item.range
}

export const isInventoryItem = <T extends EquipmentItem>(
  item: T,
): item is InventoryItem<T> => {
  return 'qty' in item
}
