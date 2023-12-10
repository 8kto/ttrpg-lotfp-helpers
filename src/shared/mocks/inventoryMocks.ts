import { Dice } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import type { MeleeWeaponItem, MissileWeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const armorItemMock1: InventoryItem<ArmorItem> = {
  armorClass: 14,
  cityCost: 25,
  inventoryId: '1',
  lockedCost: 50,
  name: 'Leather',
  points: EncumbrancePoint.None,
  ruralCost: 50,
  type: ArmorType.Armor,
}

export const armorItemMock2: InventoryItem<ArmorItem> = {
  armorClass: 16,
  cityCost: 100,
  inventoryId: '2',
  lockedCost: 50,
  name: 'Chain',
  points: EncumbrancePoint.Oversized,
  ruralCost: null,
  type: ArmorType.Armor,
}

export const meleeWeaponItemMock1: InventoryItem<MeleeWeaponItem> = {
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

export const meleeWeaponItemMock2: InventoryItem<MeleeWeaponItem> = {
  cityCost: 5,
  damage: {
    dice: Dice.d6,
    x: 1,
  },
  inventoryId: '4',
  lockedCost: 5,
  name: 'Garrote',
  points: EncumbrancePoint.None,
  ruralCost: null,
  type: WeaponType.Melee,
}

export const missileWeaponItemMock1: InventoryItem<MissileWeaponItem> = {
  cityCost: 5,
  damage: null,
  inventoryId: '5',
  lockedCost: 5,
  name: 'Blowgun',
  points: EncumbrancePoint.Regular,
  range: { long: 80, medium: 50, short: 20 },
  ruralCost: null,
  type: WeaponType.Missile,
}

export const missileWeaponItemMock2: InventoryItem<MissileWeaponItem> = {
  cityCost: 30,
  damage: { dice: Dice.d8, x: 1 },
  inventoryId: '6',
  lockedCost: 30,
  name: 'Crossbow, Heavy',
  points: EncumbrancePoint.Oversized,
  range: { long: 600, medium: 200, short: 50 },
  ruralCost: null,
  type: WeaponType.Missile,
}

export const miscEquipItem1: InventoryItem<EquipmentItem> = {
  cityCost: 1,
  inventoryId: '7',
  lockedCost: 1,
  name: 'Air Bladder',
  points: EncumbrancePoint.None,
  ruralCost: 1,
}

export const miscEquipItem2: InventoryItem<EquipmentItem> = {
  cityCost: 10,
  inventoryId: '8',
  lockedCost: 10,
  name: 'Tent, Regular',
  points: EncumbrancePoint.Oversized,
  ruralCost: 20,
}
