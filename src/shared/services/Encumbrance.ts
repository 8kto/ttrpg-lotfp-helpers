import type { CurrencyWallet } from '@/domain/currency'
import type { EncumbranceThreshold } from '@/domain/encumbrance'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { CountableItem } from '@/shared/helpers/encumbrance'
import { getCoinItems } from '@/shared/helpers/encumbrance'
import { roundTo } from '@/shared/helpers/roundTo'

type EncumbranceProps = {
  readonly threshold: EncumbranceThreshold
}

enum Signal {
  RegularEncumbrance = 'RegularEncumbrance',
  SkipEncumbrance = 'SkipEncumbrance',
}

class Encumbrance {
  private itemsCounter: number = 0
  private isRegularEncumbrance: boolean = false

  constructor({ threshold }: EncumbranceProps) {
    this.itemsCounter = threshold
  }

  /**
   * Determines the encumbrance status of an item and updates the counter.
   * The first X (5 for regular characters, 10 for dwarves) items in the character list
   * are not subject to encumbrance, unless they are Armor or Oversized items.
   */
  private getSkippedItems(item: CountableItem): Signal | number {
    const isEncumbranceFree = item.points !== EncumbrancePoint.Regular

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
    const records = wallet ? items.concat(getCoinItems(wallet)) : []
    const totalCosts: CurrencyWallet = {
      Copper: 0,
      Gold: 0,
      Silver: 0,
    }
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
}

export default Encumbrance
