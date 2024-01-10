import {
  isArmorItem,
  isInventoryItem,
  isMissileItem,
  isWeaponItem,
} from '@/components/Inventory/ItemDetails/helpers'
import {
  armorItemMock1,
  meleeWeaponItemMock1,
  miscEquipItem1,
  missileWeaponItemMock1,
  missileWeaponItemMock2,
} from '@/shared/mocks/inventoryMocks'

describe('ItemDetails helpers', () => {
  describe('isArmorItem', () => {
    it('should return true', () => {
      expect(isArmorItem(armorItemMock1)).toBeTruthy()
    })
    it('should return false', () => {
      expect(isArmorItem(miscEquipItem1)).toBeFalsy()
    })
  })

  describe('isWeaponItem', () => {
    it('should return true', () => {
      expect(isWeaponItem(missileWeaponItemMock2)).toBeTruthy()
      expect(isWeaponItem(meleeWeaponItemMock1)).toBeTruthy()
    })
    it('should return false', () => {
      expect(isArmorItem(miscEquipItem1)).toBeFalsy()
    })
  })

  describe('isMissileItem', () => {
    it('should return true', () => {
      expect(isMissileItem(missileWeaponItemMock1)).toBeTruthy()
    })
    it('should return false', () => {
      expect(isArmorItem(miscEquipItem1)).toBeFalsy()
    })
  })

  describe('isInventoryItem', () => {
    it('should return true', () => {
      expect(isInventoryItem(armorItemMock1)).toBeTruthy()
      expect(isInventoryItem(missileWeaponItemMock1)).toBeTruthy()
      expect(isInventoryItem(meleeWeaponItemMock1)).toBeTruthy()
      expect(isInventoryItem(miscEquipItem1)).toBeTruthy()
    })
    it('should return false', () => {
      const mock = { ...miscEquipItem1 }
      // @ts-ignore
      delete mock.inventoryId
      expect(isInventoryItem(mock)).toBeFalsy()
    })
  })
})
