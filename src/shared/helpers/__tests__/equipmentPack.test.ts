import '@testing-library/jest-dom'

import type { EquipmentPack } from '@/domain/equipment'
import {
  getEquipmentPackCost,
  getEquipmentPackItems,
} from '@/shared/helpers/equipmentPack'

describe('equipmentPack', () => {
  const loggerErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
    /*do not write in console*/
  })

  describe('getEquipmentPackItems', () => {
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
        name: 'Basic',
      }

      const items = getEquipmentPackItems(pack)
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
      const items = getEquipmentPackItems(emptyPack)
      expect(items).toHaveLength(0)
    })

    it('handles missing items gracefully', () => {
      const packWithMissingItems: EquipmentPack = {
        items: [['Nonexistent Item', 1]],
        name: 'Faulty Pack',
      }
      const items = getEquipmentPackItems(packWithMissingItems)
      expect(items).toHaveLength(0)
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'could not find item by name: Nonexistent Item',
        ),
      )
    })

    it('excludes items with non-positive quantities', () => {
      const packWithZeroQty: EquipmentPack = {
        items: [['Bedroll', 0]],
        name: 'Zero Quantity Pack',
      }
      const items = getEquipmentPackItems(packWithZeroQty)
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
      const items = getEquipmentPackItems(mixedPack)
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
  })

  describe('getEquipmentPackCost', () => {
    // Mocked Equipment Pack
    const pack: EquipmentPack = {
      items: [
        ['Bedroll', 1], // 1sp
        ['Rations, Standard/Day', 3], // 0.5sp * 3
        ['Backpack', 1], // 1sp
        ['Pouch', 1], // 0.1sp
        ['Sack', 1], // 0.2sp
        ['Tinderbox', 1], // 1sp
      ],
      name: 'Basic',
    }

    it('calculates the correct total cost (always minimal)', () => {
      const totalCost = getEquipmentPackCost(pack)
      expect(totalCost).toBe(1 + 1.5 + 1 + 0.1 + 0.2 + 1)
    })

    it('returns 0 for an empty equipment pack', () => {
      const emptyPack = { items: [], name: 'Empty Pack' }
      const totalCost = getEquipmentPackCost(emptyPack)
      expect(totalCost).toBe(0)
    })

    it('returns 0 for unknown item', () => {
      const packMock: EquipmentPack = {
        items: [['Treasures', 5]],
        name: 'Treasures Pack',
      }
      const totalCost = getEquipmentPackCost(packMock)
      expect(totalCost).toBe(0)
    })

    it('returns 0 for both 0 costs', () => {
      const packMock: EquipmentPack = {
        items: [['Rock', 15]],
        name: 'Treasures Pack',
      }
      const totalCost = getEquipmentPackCost(packMock)
      expect(totalCost).toBe(0)
    })

    it('handles different quantities correctly', () => {
      // Change quantities in the pack for this test
      const modifiedPack: EquipmentPack = {
        ...pack,
        items: pack.items.map(([item, qty]) => [item, qty * 2]), // Doubling quantities
      }

      const totalCost = getEquipmentPackCost(modifiedPack)
      expect(totalCost).toBe((1 + 1.5 + 1 + 0.1 + 0.2 + 1) * 2)
    })
  })
})
