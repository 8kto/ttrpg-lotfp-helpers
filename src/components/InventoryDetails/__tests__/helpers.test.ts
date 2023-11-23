import { getEncumbrance, getTotal } from '@/components/InventoryDetails/helpers'
import type { EquipmentItem, InventoryItem } from '@/domain'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'

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
        ruralCost: null,
      }
    }

    fit('returns total cost and points of all equipment items', () => {
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

      expect(getTotal(items)).toEqual({
        totalCost: 1800,
        totalEncumbrancePoints: 6.4,
      })
    })

    it('returns zero for empty arrays', () => {
      expect(getTotal([])).toEqual({
        totalCost: 0,
        totalEncumbrancePoints: 0,
      })
    })
  })
})
