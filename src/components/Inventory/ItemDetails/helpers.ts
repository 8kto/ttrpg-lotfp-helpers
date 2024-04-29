import type { ArmorItem } from '@/domain/armor'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type {
  FirearmWeaponItem,
  MeleeWeaponItem,
  MissileWeaponItem,
  WeaponItem,
} from '@/domain/weapon'

export const isArmorItem = (item: EquipmentItem): item is ArmorItem => {
  return item.categoryKey === 'armor'
}

export const isWeaponItem = (item: EquipmentItem): item is WeaponItem => {
  return (
    item.categoryKey === 'meleeWeapons' || item.categoryKey === 'missileWeapons'
  )
}

export const isMeleeWeaponItem = (
  item: EquipmentItem,
): item is MeleeWeaponItem => {
  return item.categoryKey === 'meleeWeapons'
}

export const isMissileItem = (
  item: EquipmentItem,
): item is MissileWeaponItem => {
  return item.categoryKey === 'missileWeapons'
}

export const isInventoryItem = <T extends EquipmentItem>(
  item: T,
): item is InventoryItem<T> => {
  return 'inventoryId' in item
}

export const isMiscEquipmentItem = (
  item: EquipmentItem,
): item is EquipmentItem => {
  return item.categoryKey === 'miscEquipment'
}

export const isFirearmItem = (
  item: EquipmentItem,
): item is FirearmWeaponItem => {
  return item.categoryKey === 'firearmWeapons'
}
