/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { CurrencyWallet } from '@/domain/currency'
import {
  Encumbrance as EncumbranceType,
  EncumbranceThreshold,
  EncumbranceUnit,
} from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import EncumbranceService from '@/shared/services/EncumbranceService'

describe('EncumbranceService', () => {
  const emptyWallet: CurrencyWallet = Object.freeze({
    Copper: 0,
    Gold: 0,
    Silver: 0,
  })
  let autoincId = 1

  const getItemMock = (
    lockedCostCp: number,
    points: EncumbranceUnit,
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
      getItemMock(200, EncumbranceUnit.None), // skipped as None
      getItemMock(200, EncumbranceUnit.None), // skipped as None
      getItemMock(50, EncumbranceUnit.Oversized),
      getItemMock(200, EncumbranceUnit.None), // skipped as None
      getItemMock(100, EncumbranceUnit.Regular), // skipped 1st
      getItemMock(100, EncumbranceUnit.Regular), // skipped 2nd
      getItemMock(200, EncumbranceUnit.Heavy),
      getItemMock(100, EncumbranceUnit.Regular), // skipped 3rd
      getItemMock(100, EncumbranceUnit.Regular), // skipped 4th
      getItemMock(100, EncumbranceUnit.Regular), // skipped 5th
      getItemMock(100, EncumbranceUnit.Regular),
      getItemMock(100, EncumbranceUnit.Regular),
      getItemMock(50, EncumbranceUnit.Oversized),
      getItemMock(200, EncumbranceUnit.Heavy),
    ] // sum: 1800cp

    it('returns total cost and points of all equipment items', () => {
      const service = new EncumbranceService({
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

    it('returns total cost and points', () => {
      const service = new EncumbranceService({
        threshold: EncumbranceThreshold.Regular,
      })

      const coins: CurrencyWallet = {
        Copper: 160,
        Gold: 390,
        Silver: 0,
      } // 5 slots * 1/5 = 1 enc. points
      expect(service.getTotal(items, coins)).toEqual({
        totalCosts: {
          Copper: 1800,
          Gold: 0,
          Silver: 0,
        },
        totalEncumbrancePoints: 7.4,
      })
    })

    it('returns totals when coins provided', () => {
      const copperCoins = 3500 // 35 slots
      const copperCoinsEncumbrance = 7 // each 100 coins are Regular encumbrance; 35 enc. slots / 5 === 7 enc. points
      const service = new EncumbranceService({
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
      const service = new EncumbranceService({
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
      const service = new EncumbranceService({
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
        getItemMock(200, EncumbranceUnit.None, 2), // should be ignored no matter of qty
        getItemMock(200, EncumbranceUnit.None, 3), // should be ignored no matter of qty
        getItemMock(50, EncumbranceUnit.Oversized, 2), // not ignored (non-regular item)
      ]

      const service = new EncumbranceService({
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

    it('applies qty from the stacked items (11)', () => {
      const itemsWithQty: ReadonlyArray<InventoryItem<EquipmentItem>> = [
        getItemMock(100, EncumbranceUnit.Regular, 11),
      ]

      const service = new EncumbranceService({
        threshold: EncumbranceThreshold.Regular,
      })

      expect(service.getTotal(itemsWithQty, emptyWallet)).toEqual({
        totalCosts: {
          Copper: 1100,
          Gold: 0,
          Silver: 0,
        },
        totalEncumbrancePoints: Number(
          /* 11 slots - 5 for free = 6 slots */ (
            6 * EncumbranceUnit.Regular
          ).toPrecision(2),
        ),
      })
    })

    it('applies qty', () => {
      const itemsWithQty: ReadonlyArray<InventoryItem<EquipmentItem>> = [
        getItemMock(200, EncumbranceUnit.Regular, 3), // should be ignored
        getItemMock(200, EncumbranceUnit.Regular, 3), // 2 of 3 should be ignored
        getItemMock(50, EncumbranceUnit.Oversized, 6), // not ignored
      ]

      const service = new EncumbranceService({
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
        getItemMock(200, EncumbranceUnit.None, 10), // skipped as None
        getItemMock(200, EncumbranceUnit.None, 1), // skipped as None
        getItemMock(50, EncumbranceUnit.Oversized, 2), // not skipped
        getItemMock(200, EncumbranceUnit.None), // skipped as None
        getItemMock(100, EncumbranceUnit.Regular, 10), // skipped 5/10
        getItemMock(100, EncumbranceUnit.Regular, 3), // not skipped
        getItemMock(200, EncumbranceUnit.Heavy), // not skipped
        getItemMock(100, EncumbranceUnit.Regular, 2), // not skipped
        getItemMock(100, EncumbranceUnit.Regular), // not skipped
        getItemMock(50, EncumbranceUnit.Oversized), // not skipped
        getItemMock(200, EncumbranceUnit.Heavy, 2), // not skipped
      ] // sum: 1800cp

      const service = new EncumbranceService({
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
      const service = new EncumbranceService({
        threshold: EncumbranceThreshold.Regular,
      })
      const items = Array.from({ length: 5 }, () =>
        getItemMock(100, EncumbranceUnit.Regular),
      )
      const result = service.getTotal(items, emptyWallet)
      expect(result.totalEncumbrancePoints).toBe(0)
    })

    it('should skip 10 items for Dwarf threshold', () => {
      const service = new EncumbranceService({
        threshold: EncumbranceThreshold.Dwarf,
      })
      const items = Array.from({ length: 10 }, () =>
        getItemMock(100, EncumbranceUnit.Regular),
      )
      const result = service.getTotal(items, emptyWallet)
      expect(result.totalEncumbrancePoints).toBe(0)
    })
  })

  describe('.getCoinsEncumbrance', () => {
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
        expect(
          EncumbranceService.getCoinsEncumbrance({
            Copper: input,
            Gold: 0,
            Silver: 0,
          }),
        ).toEqual({ lockedCostCp: 0, points: 0.2, qty: expectedLength })
      },
    )

    it('should compile items', () => {
      expect(
        EncumbranceService.getCoinsEncumbrance({
          Copper: 100,
          Silver: 100,
          Gold: 100,
        }),
      ).toEqual({ lockedCostCp: 0, points: 0.2, qty: 3 })
    })

    it('should compile mixed set', () => {
      expect(
        EncumbranceService.getCoinsEncumbrance({
          Copper: 200,
          Silver: 10,
          Gold: 1000,
        }),
      ).toEqual({ lockedCostCp: 0, points: 0.2, qty: 12 })
    })

    it('should ignore items < 100', () => {
      expect(
        EncumbranceService.getCoinsEncumbrance({
          Copper: 20,
          Silver: 10,
          Gold: 99,
        }), // 99 + 10 + 20 = 129 which still occupies 1 slot
      ).toEqual({ lockedCostCp: 0, points: 0.2, qty: 1 })
    })

    it('should round down', () => {
      expect(
        EncumbranceService.getCoinsEncumbrance({
          Copper: 299,
          Silver: 560,
          Gold: 115,
        }),
      ).toEqual({ lockedCostCp: 0, points: 0.2, qty: 9 })
    })
  })

  describe('.getEncumbrance', () => {
    it.each([
      [0, EncumbranceType.Unencumbered],
      [5, EncumbranceType.Unencumbered],
      [6, EncumbranceType.Lightly],
      [10, EncumbranceType.Lightly],
      [11, EncumbranceType.Heavily],
      [15, EncumbranceType.Heavily],
      [16, EncumbranceType.Severely],
      [20, EncumbranceType.Severely],
      [21, EncumbranceType.OverEncumbered],
      [31, EncumbranceType.OverEncumbered],
      [100, EncumbranceType.OverEncumbered],
    ])('should return %d -> %s', (input, expected) => {
      expect(
        EncumbranceService.getEncumbrance(input * EncumbranceUnit.Regular),
      ).toEqual(expected)
    })
  })

  describe('.getReadableEncumbrance', () => {
    it.each([
      [1, 1],
      [5, 1],
      [6, 2],
      [10, 2],
      [11, 3],
      [15, 3],
      [16, 4],
      [20, 4],
      [21, 5],
      [25, 5],
    ])('returns expected for %d e.u. -> %d e.p.', (input, expected) => {
      expect(
        EncumbranceService.getReadableEncumbrance(
          input * EncumbranceUnit.Regular,
        ),
      ).toEqual(expected)
    })

    it.each([
      [1, EncumbranceType.Unencumbered],
      [5, EncumbranceType.Unencumbered],
      [6, EncumbranceType.Lightly],
      [10, EncumbranceType.Lightly],
      [11, EncumbranceType.Heavily],
      [15, EncumbranceType.Heavily],
      [16, EncumbranceType.Severely],
      [20, EncumbranceType.Severely],
      [21, EncumbranceType.OverEncumbered],
      [25, EncumbranceType.OverEncumbered],
    ])('integration %d e.u. -> %s', (input, expected) => {
      expect(
        EncumbranceService.getEncumbrance(
          EncumbranceService.getReadableEncumbrance(
            input * EncumbranceUnit.Regular,
          ),
        ),
      ).toEqual(expected)
    })
  })
})
