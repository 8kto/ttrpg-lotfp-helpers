import type { InventoryItem } from '@/domain'
import { Dice } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { WeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const testArmorItem: InventoryItem<ArmorItem> = {
  armorClass: 14,
  cityCost: 25,
  inventoryId: '1',
  lockedCost: 50,
  name: 'Leather',
  points: EncumbrancePoint.None,
  ruralCost: 50,
  type: ArmorType.Armor,
}

export const testWeaponItem: InventoryItem<WeaponItem> = {
  cityCost: 10,
  damage: {
    dice: Dice.d3,
    x: 1,
  },
  inventoryId: '3',
  lockedCost: 10,
  name: 'Cestus',
  points: EncumbrancePoint.None,
  ruralCost: null,
  type: WeaponType.Melee,
}
