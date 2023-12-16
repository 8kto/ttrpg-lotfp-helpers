import type { EquipmentItem } from '@/domain/equipment'
import { getInventoryItem } from '@/shared/helpers/getInventoryItem'
import {
  armorItemMock1,
  meleeWeaponItemMock1,
} from '@/shared/mocks/inventoryMocks'

jest.mock('@/components/DataGrid/helpers', () => ({
  trivialSort: jest.fn(() => {
    return () => {
      /* noop */
    }
  }),
}))

describe('getInventoryItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('creates an InventoryItem with expected properties', () => {
    const testItem: EquipmentItem = armorItemMock1
    const cost = 150
    const inventoryItem = getInventoryItem(testItem, cost)

    expect(inventoryItem).toEqual({
      ...testItem,
      inventoryId: expect.stringContaining(testItem.name),
      lockedCost: cost,
    })
  })

  it('generates unique inventoryIds for different items', () => {
    const item1: EquipmentItem = armorItemMock1
    const item2: EquipmentItem = meleeWeaponItemMock1
    const cost = 100

    const inventoryItem1 = getInventoryItem(item1, cost)
    const inventoryItem2 = getInventoryItem(item2, cost)

    expect(inventoryItem1.inventoryId).not.toBe(inventoryItem2.inventoryId)
  })

  it('maintains consistent inventoryId format', () => {
    const testItem: EquipmentItem = armorItemMock1
    const cost = 100
    const inventoryItem = getInventoryItem(testItem, cost)

    expect(inventoryItem.inventoryId).toMatch(
      new RegExp(`^${testItem.name}\\d+$`),
    )
  })
})
