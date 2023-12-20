import { getCustomEquipmentItem } from '@/components/Inventory/AddEquipmentItemFragment/helpers'
import { EncumbrancePoint } from '@/domain/encumbrance'
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
        details: 'A sharp sword',
        isCopper: false,
        name: 'Sword',
        points: EncumbrancePoint.Regular,
      }

      const result = getCustomEquipmentItem(data)

      expect(result).toEqual({
        categoryKey: 'meleeWeapons',
        cityCostCp: 100,
        details: 'A sharp sword',
        inventoryId: 'Sword001',
        lockedCostCp: 100,
        name: 'Sword',
        points: EncumbrancePoint.Regular,
        qty: 1,
        ruralCostCp: 100,
      })
    })

    it('throws error if name is not provided', () => {
      const data = {
        category: 'meleeWeapons',
        cost: 100,
        details: 'A sharp sword',
        isCopper: false,
        points: EncumbrancePoint.Regular,
      } as EquipmentItemDto
      expect(() => getCustomEquipmentItem(data)).toThrow('No name provided')
    })

    it('throws error if points are not provided', () => {
      const data = {
        category: 'meleeWeapons',
        cost: 100,
        details: 'A sharp sword',
        isCopper: false,
        name: 'Sword',
      } as EquipmentItemDto
      expect(() => getCustomEquipmentItem(data)).toThrow('No points provided')
    })

    it('handles missing cost and details', () => {
      const data = {
        category: 'meleeWeapons',
        isCopper: false,
        name: 'Sword',
        points: EncumbrancePoint.Regular,
      } as EquipmentItemDto

      const result = getCustomEquipmentItem(data)
      expect(result).toEqual({
        categoryKey: 'meleeWeapons',
        cityCostCp: 0,
        details: null,
        inventoryId: 'Sword001',
        lockedCostCp: 0,
        name: 'Sword',
        points: EncumbrancePoint.Regular,
        qty: 1,
        ruralCostCp: null,
      })
    })
  })
})
