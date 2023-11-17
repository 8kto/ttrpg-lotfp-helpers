import {
  armorItemMock1,
  meleeWeaponItemMock1,
} from '@/shared/mocks/inventoryMocks'
import {
  addArmor,
  addMeleeWeapon,
  getInitialInventoryState,
  InventoryState,
  removeArmor,
  removeMeleeWeapon,
  toggleCost,
} from '@/state/InventoryState'

describe('InventoryState Tests', () => {
  beforeEach(() => {
    InventoryState.set(getInitialInventoryState())
  })

  describe('armor', () => {
    it('adds armor item correctly', () => {
      addArmor(armorItemMock1)
      expect(InventoryState.armor.get()).toContainEqual(armorItemMock1)
    })

    it('removes armor item correctly', () => {
      addArmor(armorItemMock1)
      removeArmor(armorItemMock1)
      expect(InventoryState.armor.get()).not.toContainEqual(armorItemMock1)
    })
  })

  describe('meleeWeapons', () => {
    it('adds weapon item correctly', () => {
      addMeleeWeapon(meleeWeaponItemMock1)
      expect(InventoryState.meleeWeapons.get()).toContainEqual(
        meleeWeaponItemMock1,
      )
    })

    it('removes weapon item correctly', () => {
      addMeleeWeapon(meleeWeaponItemMock1)
      removeMeleeWeapon(meleeWeaponItemMock1)
      expect(InventoryState.meleeWeapons.get()).not.toContainEqual(
        meleeWeaponItemMock1,
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
