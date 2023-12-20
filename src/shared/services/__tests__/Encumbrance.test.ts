import type { CurrencyWallet } from '@/domain/currency'
import { EncumbrancePoint, EncumbranceThreshold } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import Encumbrance from '@/shared/services/Encumbrance'

describe('Encumbrance', () => {
  const emptyWallet: CurrencyWallet = Object.freeze({
    Copper: 0,
    Gold: 0,
    Silver: 0,
  })
  let autoincId = 1

  const getItemMock = (
    lockedCostCp: number,
    points: EncumbrancePoint,
    qty: number = 1,
  ): InventoryItem<EquipmentItem> => {
    return {
      categoryKey: 'miscEquipment',
      cityCostCp: lockedCostCp,
      inventoryId: `i${autoincId++}`,
      lockedCostCp: lockedCostCp,
      name: 'Item',
      points,
      qty,
      ruralCostCp: null,
    }
  }

  describe('singular items', () => {
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
      const service = new Encumbrance({
        threshold: EncumbranceThreshold.Regular,
      })

      expect(service.getTotal(items, emptyWallet)).toEqual({
        totalCosts: {
          Copper: 1800,
          Gold: 0,
          Silver: 0,
        },
        totalEncumbrancePoints: 6.4,
      })
    })

    it('returns totals when coins provided', () => {
      const copperCoins = 3500 // 35 slots
      const copperCoinsEncumbrance = 7 // each 100 coins are Regular encumbrance; 35 enc. slots / 5 === 7 enc. points
      const service = new Encumbrance({
        threshold: EncumbranceThreshold.Regular,
      })

      expect(
        service.getTotal(items, { ...emptyWallet, Copper: copperCoins }),
      ).toEqual({
        totalCosts: {
          Copper: 1800,
          Gold: 0,
          Silver: 0,
        },
        totalEncumbrancePoints: 6.4 + copperCoinsEncumbrance,
      })
    })

    it('returns totals when coins provided wo items', () => {
      const itemsEmpty: InventoryItem<EquipmentItem>[] = []

      const copperCoins = 3500 // 35 slots
      // each 100 coins are Regular encumbrance; (35 enc. points - 5 free points)/5 === 6 slots
      const copperCoinsEncumbrance = 6
      const service = new Encumbrance({
        threshold: EncumbranceThreshold.Regular,
      })
      expect(
        service.getTotal(itemsEmpty, { ...emptyWallet, Copper: copperCoins }),
      ).toEqual({
        totalCosts: emptyWallet,
        totalEncumbrancePoints: copperCoinsEncumbrance,
      })
    })

    it('returns zero for empty arrays', () => {
      const service = new Encumbrance({
        threshold: EncumbranceThreshold.Regular,
      })

      expect(service.getTotal([], emptyWallet)).toEqual({
        totalCosts: emptyWallet,
        totalEncumbrancePoints: 0,
      })
    })
  })

  describe('qty', () => {
    it('applies qty (ignored)', () => {
      const itemsWithQty: ReadonlyArray<InventoryItem<EquipmentItem>> = [
        getItemMock(200, EncumbrancePoint.None, 2), // should be ignored no matter of qty
        getItemMock(200, EncumbrancePoint.None, 3), // should be ignored no matter of qty
        getItemMock(50, EncumbrancePoint.Oversized, 2), // not ignored (non-regular item)
      ]

      const service = new Encumbrance({
        threshold: EncumbranceThreshold.Regular,
      })

      expect(service.getTotal(itemsWithQty, emptyWallet)).toEqual({
        totalCosts: {
          Copper: 1100,
          Gold: 0,
          Silver: 0,
        },
        totalEncumbrancePoints: 2,
      })
    })

    it('applies qty', () => {
      const itemsWithQty: ReadonlyArray<InventoryItem<EquipmentItem>> = [
        getItemMock(200, EncumbrancePoint.Regular, 3), // should be ignored
        getItemMock(200, EncumbrancePoint.Regular, 3), // 2 of 3 should be ignored
        getItemMock(50, EncumbrancePoint.Oversized, 6), // not ignored
      ]

      const service = new Encumbrance({
        threshold: EncumbranceThreshold.Regular,
      })

      expect(service.getTotal(itemsWithQty, emptyWallet)).toEqual({
        totalCosts: {
          Copper: 1500,
          Gold: 0,
          Silver: 0,
        },
        totalEncumbrancePoints: 6.2,
      })
    })

    it('appliles qty on rich set of items', () => {
      const itemsWithQty: ReadonlyArray<InventoryItem<EquipmentItem>> = [
        getItemMock(200, EncumbrancePoint.None, 10), // skipped as None
        getItemMock(200, EncumbrancePoint.None, 1), // skipped as None
        getItemMock(50, EncumbrancePoint.Oversized, 2), // not skipped
        getItemMock(200, EncumbrancePoint.None), // skipped as None
        getItemMock(100, EncumbrancePoint.Regular, 10), // skipped 5/10
        getItemMock(100, EncumbrancePoint.Regular, 3), // not skipped
        getItemMock(200, EncumbrancePoint.Heavy), // not skipped
        getItemMock(100, EncumbrancePoint.Regular, 2), // not skipped
        getItemMock(100, EncumbrancePoint.Regular), // not skipped
        getItemMock(50, EncumbrancePoint.Oversized), // not skipped
        getItemMock(200, EncumbrancePoint.Heavy, 2), // not skipped
      ] // sum: 1800cp

      const service = new Encumbrance({
        threshold: EncumbranceThreshold.Regular,
      })

      expect(service.getTotal(itemsWithQty, emptyWallet)).toEqual({
        totalCosts: {
          Copper: 4750,
          Gold: 0,
          Silver: 0,
        },
        totalEncumbrancePoints: 11.2,
      })
    })
  })

  describe('thresholds', () => {
    it('should skip 5 items for Regular threshold', () => {
      const service = new Encumbrance({
        threshold: EncumbranceThreshold.Regular,
      })
      const items = Array.from({ length: 5 }, () =>
        getItemMock(100, EncumbrancePoint.Regular),
      )
      const result = service.getTotal(items, emptyWallet)
      expect(result.totalEncumbrancePoints).toBe(0)
    })

    it('should skip 10 items for Dwarf threshold', () => {
      const service = new Encumbrance({ threshold: EncumbranceThreshold.Dwarf })
      const items = Array.from({ length: 10 }, () =>
        getItemMock(100, EncumbrancePoint.Regular),
      )
      const result = service.getTotal(items, emptyWallet)
      expect(result.totalEncumbrancePoints).toBe(0)
    })
  })
})
