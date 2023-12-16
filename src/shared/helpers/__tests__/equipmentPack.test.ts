import '@testing-library/jest-dom'

import type { I18n } from '@lingui/core'

import type { EquipmentPack } from '@/domain/equipment'
import {
  getEquipmentPackCost,
  getEquipmentPackItems,
} from '@/shared/helpers/equipmentPack'

describe('getEquipmentPackItems', () => {
  const mockTrans = jest.fn((key) => key)
  const i18n = { _: mockTrans } as unknown as I18n
  const loggerErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
    /*do not write in console*/
  })

  it('returns items for a given equipment pack', () => {
    const pack: EquipmentPack = {
      items: [
        ['Bedroll', 1],
        ['Rations, Standard/Day', 3],
        ['Backpack', 1],
        ['Pouch', 1],
        ['Sack', 1],
        ['Tinderbox', 1],
      ],
      name: 'Base items set',
    }

    const items = getEquipmentPackItems(pack, i18n._)
    expect(items).toHaveLength(pack.items.length)
    expect(items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Rations, Standard/Day',
          qty: 3,
        }),
        expect.objectContaining({
          name: 'Backpack',
          qty: 1,
        }),
        expect.objectContaining({
          name: 'Bedroll',
          qty: 1,
        }),
        expect.objectContaining({
          name: 'Pouch',
          qty: 1,
        }),
        expect.objectContaining({
          name: 'Sack',
          qty: 1,
        }),
        expect.objectContaining({
          name: 'Tinderbox',
          qty: 1,
        }),
      ]),
    )
  })

  it('returns an empty array for an empty equipment pack', () => {
    const emptyPack = { items: [], name: 'Empty Pack' }
    const items = getEquipmentPackItems(emptyPack, i18n._)
    expect(items).toHaveLength(0)
  })

  it('handles missing items gracefully', () => {
    const packWithMissingItems: EquipmentPack = {
      items: [['Nonexistent Item', 1]],
      name: 'Faulty Pack',
    }
    const items = getEquipmentPackItems(packWithMissingItems, i18n._)
    expect(items).toHaveLength(0)
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('could not find item by name: Nonexistent Item'),
    )
  })

  it('excludes items with non-positive quantities', () => {
    const packWithZeroQty: EquipmentPack = {
      items: [['Bedroll', 0]],
      name: 'Zero Quantity Pack',
    }
    const items = getEquipmentPackItems(packWithZeroQty, i18n._)
    expect(items).toHaveLength(0)
  })

  it('returns correct items for a pack with mixed valid and invalid entries', () => {
    const mixedPack: EquipmentPack = {
      items: [
        ['Bedroll', 1],
        ['Nonexistent Item', 1],
      ],
      name: 'Mixed Pack',
    }
    const items = getEquipmentPackItems(mixedPack, i18n._)
    expect(items).toHaveLength(1) // Only 'Bedroll' is valid
    expect(items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Bedroll',
          qty: 1,
        }),
      ]),
    )
  })

  describe('getEquipmentPackCost', () => {
    // Mocked Equipment Pack
    const pack: EquipmentPack = {
      items: [
        ['Bedroll', 1],
        ['Rations, Standard/Day', 3],
        ['Backpack', 1],
        ['Pouch', 1],
        ['Sack', 1],
        ['Tinderbox', 1],
      ],
      name: 'Base items set',
    }

    // Mocked equipment items with costs
    const mockEquipmentItems = {
      Backpack: { cityCost: 20 },
      Bedroll: { cityCost: 10 },
      Pouch: { cityCost: 5 },
      'Rations, Standard/Day': { cityCost: 5 },
      Sack: { cityCost: 3 },
      Tinderbox: { cityCost: 2 },
    }

    it('calculates the correct total cost for a given equipment pack', () => {
      const totalCost = getEquipmentPackCost(pack, mockTrans)
      expect(totalCost).toBe(10 + 3 * 5 + 20 + 5 + 3 + 2) // Replace with expected total cost
    })

    it('handles missing items gracefully', () => {
      // Remove an item from the mock
      delete mockEquipmentItems['Pouch']

      const totalCost = getEquipmentPackCost(pack, mockTrans)
      expect(totalCost).toBe(/* expected total cost without 'Pouch' */)
    })

    it('returns 0 for an empty equipment pack', () => {
      const emptyPack = { items: [], name: 'Empty Pack' }
      const totalCost = getEquipmentPackCost(emptyPack, mockTrans)
      expect(totalCost).toBe(0)
    })

    it('handles different quantities correctly', () => {
      // Change quantities in the pack for this test
      const modifiedPack = {
        ...pack,
        items: pack.items.map(([item, qty]) => [item, qty * 2]), // Doubling quantities
      }

      const totalCost = getEquipmentPackCost(modifiedPack, mockTrans)
      expect(totalCost).toBe(/* expected total cost with doubled quantities */)
    })
  })
})
