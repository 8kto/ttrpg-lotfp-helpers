import type { CurrencyWallet } from '@/domain/currency'
import type { EncumbranceThreshold } from '@/domain/encumbrance'
import {
  Encumbrance as EncumbranceType,
  EncumbranceUnit,
} from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { roundTo } from '@/shared/helpers/roundTo'

type EncumbranceProps = {
  readonly threshold: EncumbranceThreshold
}

enum Signal {
  RegularEncumbrance = 'RegularEncumbrance',
  SkipEncumbrance = 'SkipEncumbrance',
}

export type CountableItem = Pick<
  InventoryItem<EquipmentItem>,
  'points' | 'lockedCostCp' | 'qty'
>

export const COINS_PER_ENCUMBRANCE_POINT = 100

class EncumbranceService {
  private itemsCounter: number = 0
  private isRegularEncumbrance: boolean = false

  constructor({ threshold }: EncumbranceProps) {
    this.itemsCounter = threshold
  }

  static getEncumbrance(points: number): EncumbranceType {
    if (points > 20 * EncumbranceUnit.Regular) {
      return EncumbranceType.OverEncumbered
    }
    if (points > 15 * EncumbranceUnit.Regular) {
      return EncumbranceType.Severely
    }
    if (points > 10 * EncumbranceUnit.Regular) {
      return EncumbranceType.Heavily
    }
    if (points > 5 * EncumbranceUnit.Regular) {
      return EncumbranceType.Lightly
    }

    return EncumbranceType.Unencumbered
  }

  /**
   * Convert coins number into an array of CountableItem, counts are rounded down
   * That is: 120 coins weight as 100 coins and occupy 1 encumbrance slot (1/5 enc. point)
   */
  static getCoinsEncumbrance(wallet: CurrencyWallet): Array<CountableItem> {
    const coinsNum = Object.values(wallet).reduce((acc, cur) => acc + cur, 0)
    const inventorySlots = Math.floor(coinsNum / COINS_PER_ENCUMBRANCE_POINT)

    return Array.from({ length: inventorySlots }, () => {
      return {
        lockedCostCp: 0,
        points: EncumbranceUnit.Regular,
        qty: 1,
      }
    })
  }

  /**
   * Determines the encumbrance status of an item and updates the counter.
   * The first X (5 for regular characters, 10 for dwarves) items in the character list
   * are not subject to encumbrance, unless they are Armor or Oversized items.
   */
  private getSkippedItems(item: CountableItem): Signal | number {
    const isEncumbranceFree = item.points !== EncumbranceUnit.Regular

    if (isEncumbranceFree || this.isRegularEncumbrance) {
      return Signal.RegularEncumbrance
    }

    this.itemsCounter -= item.qty
    if (this.itemsCounter <= 0) {
      this.isRegularEncumbrance = true

      return this.itemsCounter
    }

    return Signal.SkipEncumbrance
  }

  /**
   * Calculates the total cost and encumbrance points for a set of items.
   */
  getTotal(
    items: ReadonlyArray<CountableItem>,
    wallet: CurrencyWallet | null,
  ): {
    totalCosts: CurrencyWallet
    totalEncumbrancePoints: number
  } {
    const records = wallet
      ? // A special countable list for coins should be processed alongside other items
        // to ensure correct handling of free encumbrance points (e.g., the first 5 for humans)
        items.concat(EncumbranceService.getCoinsEncumbrance(wallet))
      : items
    const totalCosts: CurrencyWallet = { Copper: 0, Gold: 0, Silver: 0 }
    let totalEncumbrancePoints = 0

    records.forEach((item) => {
      const { lockedCostCp, points, qty } = item
      const skipped = this.getSkippedItems(item)

      let increment: number = 0
      switch (skipped) {
        case Signal.SkipEncumbrance:
          increment = 0
          break
        case Signal.RegularEncumbrance:
          increment = qty * points
          break
        default:
          increment = Math.abs(skipped) * points
          break
      }

      totalCosts.Copper += lockedCostCp * qty
      totalEncumbrancePoints += increment
    })

    return {
      totalCosts: totalCosts,
      totalEncumbrancePoints: roundTo(totalEncumbrancePoints, 1),
    }
  }

  static getReadableEncumbrance(encumbrance: number ): number {
    const slots = roundTo(encumbrance / EncumbranceUnit.Regular, 1)

    return Math.ceil(slots / 5)
  }
}

export default EncumbranceService
