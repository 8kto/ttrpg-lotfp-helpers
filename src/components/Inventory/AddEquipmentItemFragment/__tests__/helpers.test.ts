import { getCustomEquipmentItem } from '@/components/Inventory/AddEquipmentItemFragment/helpers'
import { CurrencyType } from '@/domain/currency'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItemDto } from '@/domain/equipment'

jest.mock('@/shared/helpers/autoincrement', () => ({
  getAutoIncrementedId: jest.fn(() => '001'),
}))

describe('AddEquipmentItemFragment helpers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getCustomEquipmentItem', () => {
    it('creates a valid equipment item', () => {
      const data: EquipmentItemDto = {
        category: 'meleeWeapons',
        cost: 100,
        currencyType: CurrencyType.Silver,
        details: 'A sharp sword',
        name: 'Sword',
        points: EncumbranceUnit.Regular,
      }

      const result = getCustomEquipmentItem(data)

      expect(result).toEqual({
        categoryKey: 'meleeWeapons',
        cityCostCp: 1000,
        details: 'A sharp sword',
        inventoryId: 'Sword001',
        lockedCostCp: 1000,
        name: 'Sword',
        points: EncumbranceUnit.Regular,
        qty: 1,
        ruralCostCp: 1000,
      })
    })

    it('throws error if name is not provided', () => {
      const data = {
        category: 'meleeWeapons',
        cost: 100,
        currencyType: CurrencyType.Silver,
        details: 'A sharp sword',
        points: EncumbranceUnit.Regular,
      } as EquipmentItemDto
      expect(() => getCustomEquipmentItem(data)).toThrow('No name provided')
    })

    it('throws error if points are not provided', () => {
      const data = {
        category: 'meleeWeapons',
        cost: 100,
        currencyType: CurrencyType.Silver,
        details: 'A sharp sword',
        name: 'Sword',
      } as EquipmentItemDto
      expect(() => getCustomEquipmentItem(data)).toThrow('No points provided')
    })

    it('handles missing cost and details', () => {
      const data = {
        category: 'meleeWeapons',
        currencyType: CurrencyType.Silver,
        name: 'Sword',
        points: EncumbranceUnit.Regular,
      } as EquipmentItemDto

      const result = getCustomEquipmentItem(data)
      expect(result).toEqual({
        categoryKey: 'meleeWeapons',
        cityCostCp: 0,
        details: null,
        inventoryId: 'Sword001',
        lockedCostCp: 0,
        name: 'Sword',
        points: EncumbranceUnit.Regular,
        qty: 1,
        ruralCostCp: 0,
      })
    })
  })
})
