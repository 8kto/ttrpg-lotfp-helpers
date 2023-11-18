import {
  armorItemMock1,
  meleeWeaponItemMock1, miscEquipItem1, missileWeaponItemMock1,
} from '@/shared/mocks/inventoryMocks'
import {
  addArmor, addEquipmentItem,
  addMeleeWeapon, addMissileWeapon,
  getInitialInventoryState,
  InventoryState,
  removeArmor, removeEquipmentItem,
  removeMeleeWeapon, removeMissileWeapon,
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

  describe('missileWeapons', () => {
    it('adds weapon item correctly', () => {
      addMissileWeapon(missileWeaponItemMock1)
      expect(InventoryState.missileWeapons.get()).toContainEqual(
        missileWeaponItemMock1,
      )
    })

    it('removes weapon item correctly', () => {
      addMissileWeapon(missileWeaponItemMock1)
      removeMissileWeapon(missileWeaponItemMock1)
      expect(InventoryState.missileWeapons.get()).not.toContainEqual(
        missileWeaponItemMock1,
      )
    })
  })

  describe('miscEquipment', () => {
    it('adds item correctly', () => {
      addEquipmentItem(miscEquipItem1)
      expect(InventoryState.miscEquipment.get()).toContainEqual(
        miscEquipItem1,
      )
    })

    it('removes item correctly', () => {
      addEquipmentItem(miscEquipItem1)
      removeEquipmentItem(miscEquipItem1)
      expect(InventoryState.miscEquipment.get()).not.toContainEqual(
        miscEquipItem1,
      )
    })
  })
})
