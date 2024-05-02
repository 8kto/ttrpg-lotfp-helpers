import { Dice } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import { FiringMechanism } from '@/domain/firearms'
import type { InventoryItem } from '@/domain/inventory'
import type {
  FirearmWeaponItem,
  MeleeWeaponItem,
  MissileWeaponItem,
} from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const armorItemMock1: InventoryItem<ArmorItem> = {
  armorClass: 14,
  categoryKey: 'armor',
  cityCostCp: 25,
  inventoryId: '1',
  lockedCostCp: 50,
  name: 'Leather',
  points: EncumbranceUnit.None,
  qty: 1,
  ruralCostCp: 50,
  type: ArmorType.Armor,
}

export const armorItemMock2: InventoryItem<ArmorItem> = {
  armorClass: 16,
  categoryKey: 'armor',
  cityCostCp: 100,
  inventoryId: '2',
  lockedCostCp: 50,
  name: 'Chain',
  points: EncumbranceUnit.Oversized,
  qty: 1,
  ruralCostCp: null,
  type: ArmorType.Armor,
}

export const meleeWeaponItemMock1: InventoryItem<MeleeWeaponItem> = {
  categoryKey: 'meleeWeapons',
  cityCostCp: 10,
  damage: {
    dice: Dice.d3,
    x: 1,
  },
  inventoryId: '3',
  lockedCostCp: 10,
  name: 'Cestus',
  points: EncumbranceUnit.None,
  qty: 1,
  ruralCostCp: null,
  type: WeaponType.Melee,
}

export const meleeWeaponItemMock2: InventoryItem<MeleeWeaponItem> = {
  categoryKey: 'meleeWeapons',
  cityCostCp: 5,
  damage: {
    dice: Dice.d6,
    x: 1,
  },
  inventoryId: '4',
  lockedCostCp: 5,
  name: 'Garrote',
  points: EncumbranceUnit.None,
  qty: 1,
  ruralCostCp: null,
  type: WeaponType.Melee,
}

export const missileWeaponItemMock1: InventoryItem<MissileWeaponItem> = {
  categoryKey: 'missileWeapons',
  cityCostCp: 5,
  damage: null,
  inventoryId: '5',
  lockedCostCp: 5,
  name: 'Blowgun',
  points: EncumbranceUnit.Regular,
  qty: 1,
  range: { long: 80, medium: 50, short: 20 },
  ruralCostCp: null,
  type: WeaponType.Missile,
}

export const missileWeaponItemMock2: InventoryItem<MissileWeaponItem> = {
  categoryKey: 'missileWeapons',
  cityCostCp: 30,
  damage: { dice: Dice.d8, x: 1 },
  inventoryId: '6',
  lockedCostCp: 30,
  name: 'Crossbow, Heavy',
  points: EncumbranceUnit.Oversized,
  qty: 1,
  range: { long: 600, medium: 200, short: 50 },
  ruralCostCp: null,
  type: WeaponType.Missile,
}

export const miscEquipItem1: InventoryItem<EquipmentItem> = {
  categoryKey: 'miscEquipment',
  cityCostCp: 1,
  inventoryId: '7',
  lockedCostCp: 1,
  name: 'Air Bladder',
  points: EncumbranceUnit.None,
  qty: 1,
  ruralCostCp: 1,
}

export const miscEquipItem2: InventoryItem<EquipmentItem> = {
  categoryKey: 'miscEquipment',
  cityCostCp: 10,
  inventoryId: '8',
  lockedCostCp: 10,
  name: 'Tent, Regular',
  points: EncumbranceUnit.Oversized,
  qty: 1,
  ruralCostCp: 20,
}

export const firearmWeaponItemMock1: InventoryItem<FirearmWeaponItem> = {
  categoryKey: 'firearmWeapons',
  cityCostCp: 300,
  damage: { dice: Dice.d8, x: 1 },
  damageMelee: { dice: Dice.d6, x: 1 },
  firingMechanism: FiringMechanism.Matchlock,
  inventoryId: '9',
  isRiffled: false,
  isTwoHanded: true,
  lockedCostCp: 300,
  name: `Arquebus`,
  points: EncumbranceUnit.Regular,
  qty: 1,
  range: { long: 600, medium: 100, short: 50 },
  ruralCostCp: 500,
  type: WeaponType.Firearms,
}
