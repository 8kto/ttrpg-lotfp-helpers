import { testArmorItem, testWeaponItem } from '@/shared/mocks/inventoryMocks'
import {
  addArmor,
  addMeleeWeapon,
  initialInventoryState,
  InventoryState,
  removeArmor,
  removeMeleeWeapon,
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

  describe('meleeWeapons', () => {
    it('adds weapon item correctly', () => {
      addMeleeWeapon(testWeaponItem)
      expect(InventoryState.meleeWeapons.get()).toContainEqual(testWeaponItem)
    })

    it('removes weapon item correctly', () => {
      addMeleeWeapon(testWeaponItem)
      removeMeleeWeapon(testWeaponItem)
      expect(InventoryState.meleeWeapons.get()).not.toContainEqual(
        testWeaponItem,
      )
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
