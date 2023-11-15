import type { InventoryItem } from '@/domain'
import { Dice } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { WeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'
import {
  addArmor,
  addWeapon, initialInventoryState,
  InventoryState,
  removeArmor,
  removeWeapon,
} from '@/state/InventoryState'

const testArmorItem: InventoryItem<ArmorItem> = {
  armorClass: 14,
  cityCost: 25,
  inventoryId: '1',
  lockedCost: 50,
  name: 'Leather',
  points: EncumbrancePoint.None,
  ruralCost: 50,
  type: ArmorType.Armor,
}

const testWeaponItem: InventoryItem<WeaponItem> = {
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

describe('InventoryState Tests', () => {
  beforeEach(() => {
    InventoryState.set(initialInventoryState)
  })

  it('adds armor item correctly', () => {
    addArmor(testArmorItem)
    expect(InventoryState.armor.get()).toContainEqual(testArmorItem)
  })

  it('removes armor item correctly', () => {
    addArmor(testArmorItem)
    removeArmor(testArmorItem)
    expect(InventoryState.armor.get()).not.toContainEqual(testArmorItem)
  })

  it('adds weapon item correctly', () => {
    addWeapon(testWeaponItem)
    expect(InventoryState.weapons.get()).toContainEqual(testWeaponItem)
  })

  it('removes weapon item correctly', () => {
    addWeapon(testWeaponItem)
    removeWeapon(testWeaponItem)
    expect(InventoryState.weapons.get()).not.toContainEqual(testWeaponItem)
  })

  it('resets inventory state correctly', () => {
    addArmor(testArmorItem)
    addWeapon(testWeaponItem)
    InventoryState.set({
      armor: [],
      isCostRural: false,
      weapons: [],
    })
    expect(InventoryState.armor.get()).toEqual([])
    expect(InventoryState.weapons.get()).toEqual([])
    expect(InventoryState.isCostRural.get()).toBe(false)
  })

  it('resets equipment only correctly', () => {
    addArmor(testArmorItem)
    addWeapon(testWeaponItem)
    InventoryState.isCostRural.set(true)
    InventoryState.merge({
      armor: [],
      weapons: [],
    })
    expect(InventoryState.armor.get()).toEqual([])
    expect(InventoryState.weapons.get()).toEqual([])
    expect(InventoryState.isCostRural.get()).toBe(true)
  })
})
