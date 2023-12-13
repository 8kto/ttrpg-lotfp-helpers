import { getEncumbrance, getTotal } from '@/components/InventoryDetails/helpers'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'

describe('InventoryDetails helpers', () => {
  describe('getEncumbrance', () => {
    it.each([
      [0, Encumbrance.Unencumbered],
      [1.8, Encumbrance.Unencumbered],
      [2, Encumbrance.Lightly],
      [2.8, Encumbrance.Lightly],
      [3, Encumbrance.Heavily],
      [3.8, Encumbrance.Heavily],
      [4, Encumbrance.Severely],
      [4.8, Encumbrance.Severely],
      [5, Encumbrance.OverEncumbered],
      [100, Encumbrance.OverEncumbered],
    ])('should return %d -> %s', (input, expected) => {
      expect(getEncumbrance(input)).toEqual(expected)
    })
  })

  describe('getTotal', () => {
    const getItemMock = (lockedCost: number, points: EncumbrancePoint) => {
      return {
        cityCost: 100,
        inventoryId: '1',
        lockedCost,
        name: 'Item',
        points,
        qty: 1,
        ruralCost: null,
      }
    }

    it('returns total cost and points of all equipment items', () => {
      const items: InventoryItem<EquipmentItem>[] = [
        getItemMock(200, EncumbrancePoint.None), // skipped as None
        getItemMock(200, EncumbrancePoint.None), // skipped as None
        getItemMock(50, EncumbrancePoint.Oversized),
        getItemMock(200, EncumbrancePoint.None), // skipped as None
        getItemMock(100, EncumbrancePoint.Regular), // skipped 1st
        getItemMock(100, EncumbrancePoint.Regular), // skipped 2nd
        getItemMock(200, EncumbrancePoint.Heavy),
        getItemMock(100, EncumbrancePoint.Regular), // skipped 3rd
        getItemMock(100, EncumbrancePoint.Regular), // skipped 4th
        getItemMock(100, EncumbrancePoint.Regular), // skipped 5th
        getItemMock(100, EncumbrancePoint.Regular),
        getItemMock(100, EncumbrancePoint.Regular),
        getItemMock(50, EncumbrancePoint.Oversized),
        getItemMock(200, EncumbrancePoint.Heavy),
      ]

      expect(getTotal(items, 0)).toEqual({
        totalCost: 1800,
        totalEncumbrancePoints: 6.4,
      })
    })

    it('returns totals when coins provided', () => {
      const items: InventoryItem<EquipmentItem>[] = [
        getItemMock(200, EncumbrancePoint.None), // skipped as None
        getItemMock(200, EncumbrancePoint.None), // skipped as None
        getItemMock(50, EncumbrancePoint.Oversized),
        getItemMock(200, EncumbrancePoint.None), // skipped as None
        getItemMock(100, EncumbrancePoint.Regular), // skipped 1st
        getItemMock(100, EncumbrancePoint.Regular), // skipped 2nd
        getItemMock(200, EncumbrancePoint.Heavy),
        getItemMock(100, EncumbrancePoint.Regular), // skipped 3rd
        getItemMock(100, EncumbrancePoint.Regular), // skipped 4th
        getItemMock(100, EncumbrancePoint.Regular), // skipped 5th
        getItemMock(100, EncumbrancePoint.Regular),
        getItemMock(100, EncumbrancePoint.Regular),
        getItemMock(50, EncumbrancePoint.Oversized),
        getItemMock(200, EncumbrancePoint.Heavy),
      ]

      const copperCoins = 35000 // will be converted to SP
      const copperCoinsEncumbrance = 7 // each 100 coins are Regular encumbrance; 35 enc. points === 7 slots
      expect(getTotal(items, copperCoins)).toEqual({
        totalCost: 1800,
        totalEncumbrancePoints: 6.4 + copperCoinsEncumbrance,
      })
    })

    it('returns totals when coins provided wo items', () => {
      const items: InventoryItem<EquipmentItem>[] = []

      const copperCoins = 35000 // will be converted to SP
      // each 100 coins are Regular encumbrance; 35 enc. points - 5 free points === 6 slots
      const copperCoinsEncumbrance = 6
      expect(getTotal(items, copperCoins)).toEqual({
        totalCost: 0,
        totalEncumbrancePoints: copperCoinsEncumbrance,
      })
    })

    it('returns zero for empty arrays', () => {
      expect(getTotal([], 0)).toEqual({
        totalCost: 0,
        totalEncumbrancePoints: 0,
      })
    })
  })
})
