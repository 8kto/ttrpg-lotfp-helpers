import type { InventoryItem } from '@/domain'
import { Dice } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { WeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'
import {
  addArmor,
  addWeapon,
  initialInventoryState,
  InventoryState,
  removeArmor,
  removeWeapon,
  toggleCost,
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

  describe('armor', () => {
    it('adds armor item correctly', () => {
      addArmor(testArmorItem)
      expect(InventoryState.armor.get()).toContainEqual(testArmorItem)
    })

    it('removes armor item correctly', () => {
      addArmor(testArmorItem)
      removeArmor(testArmorItem)
      expect(InventoryState.armor.get()).not.toContainEqual(testArmorItem)
    })
  })

  describe('weapons', () => {
    it('adds weapon item correctly', () => {
      addWeapon(testWeaponItem)
      expect(InventoryState.weapons.get()).toContainEqual(testWeaponItem)
    })

    it('removes weapon item correctly', () => {
      addWeapon(testWeaponItem)
      removeWeapon(testWeaponItem)
      expect(InventoryState.weapons.get()).not.toContainEqual(testWeaponItem)
    })
  })

  describe('isCostRural', () => {
    it('should toggle cost', () => {
      expect(InventoryState.isCostRural.get()).toEqual(false)
      toggleCost()
      expect(InventoryState.isCostRural.get()).toEqual(true)
    })
  })

  // TODO test hook
})
