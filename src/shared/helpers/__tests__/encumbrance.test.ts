import { Coin } from '@/domain'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import {
  getCoinItems,
  getEncumbrance,
  getTotal,
} from '@/shared/helpers/encumbrance'

describe('encumbrance helpers', () => {
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

  describe('getCoinItems', () => {
    const mockCountableItemCp = (length: number) => {
      return Array.from({ length }, () => {
        return {
          lockedCost: 0,
          name: '100 coins (cp)',
          points: EncumbrancePoint.Regular,
          qty: 1,
        }
      })
    }

    it.each([
      [100, 1],
      [200, 2],
      [250, 2],
      [1000, 10],
      [0, 0],
      [50, 0],
    ])(
      'should return expected array of items for %d CP',
      (input, expectedLength) => {
        expect(getCoinItems(input, Coin.Copper)).toEqual(
          mockCountableItemCp(expectedLength),
        )
      },
    )
  })

  describe('getTotal', () => {
    const getItemMock = (
      lockedCostCp: number,
      points: EncumbrancePoint,
    ): InventoryItem<EquipmentItem> => {
      return {
        categoryKey: 'miscEquipment',
        cityCost: 100,
        inventoryId: '1',
        lockedCost: lockedCostCp / 10,
        name: 'Item',
        points,
        qty: 1,
        ruralCost: null,
      }
    }

    const items: ReadonlyArray<InventoryItem<EquipmentItem>> = [
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
    ] // sum: 1800cp

    it('returns total cost and points of all equipment items', () => {
      expect(getTotal(items, 0)).toEqual({
        totalCostSp: 180,
        totalEncumbrancePoints: 6.4,
      })
    })

    it('returns totals when coins provided', () => {
      const coinsCp = 3500 // 35 slots
      const copperCoinsEncumbrance = 7 // each 100 coins are Regular encumbrance; 35 enc. slots / 5 === 7 enc. points
      expect(getTotal(items, coinsCp)).toEqual({
        totalCostSp: 180,
        totalEncumbrancePoints: 6.4 + copperCoinsEncumbrance,
      })
    })

    it('returns totals when coins provided wo items', () => {
      const itemsEmpty: InventoryItem<EquipmentItem>[] = []

      const copperCoins = 3500 // 35 slots
      // each 100 coins are Regular encumbrance; (35 enc. points - 5 free points)/5 === 6 slots
      const copperCoinsEncumbrance = 6
      expect(getTotal(itemsEmpty, copperCoins)).toEqual({
        totalCostSp: 0,
        totalEncumbrancePoints: copperCoinsEncumbrance,
      })
    })

    it('returns zero for empty arrays', () => {
      expect(getTotal([], 0)).toEqual({
        totalCostSp: 0,
        totalEncumbrancePoints: 0,
      })
    })
  })
})
