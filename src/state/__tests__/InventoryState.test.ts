import { testArmorItem, testWeaponItem } from '@/shared/mocks/inventoryMocks'
import {
  addArmor,
  addWeapon,
  initialInventoryState,
  InventoryState,
  removeArmor,
  removeWeapon,
  toggleCost,
} from '@/state/InventoryState'

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
})
