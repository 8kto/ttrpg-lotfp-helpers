import { t } from '@lingui/macro'

import type { CurrencyWallet } from '@/domain/currency'
import { CurrencyType } from '@/domain/currency'
import type { EncumbranceThreshold } from '@/domain/encumbrance'
import {
  Encumbrance as EncumbranceType,
  EncumbrancePoint,
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
  'points' | 'lockedCostCp' | 'name' | 'qty'
>

export const COINS_PER_ENCUMBRANCE_POINT = 100

class EncumbranceService {
  private itemsCounter: number = 0
  private isRegularEncumbrance: boolean = false

  constructor({ threshold }: EncumbranceProps) {
    this.itemsCounter = threshold
  }

  static getEncumbrance(points: number): EncumbranceType {
    if (points >= 5) {
      return EncumbranceType.OverEncumbered
    }
    if (points >= 4) {
      return EncumbranceType.Severely
    }
    if (points >= 3) {
      return EncumbranceType.Heavily
    }
    if (points >= 2) {
      return EncumbranceType.Lightly
    }

    return EncumbranceType.Unencumbered
  }

  /**
   * Convert coins number into an array of CountableItem, counts are rounded down
   * That is: 120 coins weight as 100 coins and occupy 1 encumbrance slot (1/5 enc. point)
   */
  static getCoinItems(wallet: CurrencyWallet): Array<CountableItem> {
    return Object.entries(wallet)
      .filter(([, value]) => !!value)
      .flatMap(([currency, value]) => {
        const coinsEncumbrance = Math.floor(value / COINS_PER_ENCUMBRANCE_POINT)

        return Array.from({ length: coinsEncumbrance }, () => {
          return {
            lockedCostCp: 0,
            name: this.getCoinsLockedCost(currency as CurrencyType),
            points: EncumbrancePoint.Regular,
            qty: 1,
          }
        })
      })
  }

  static getCoinsLockedCost(type: CurrencyType) {
    switch (type) {
      case CurrencyType.Copper:
        return t`100 coins (cp)`
      case CurrencyType.Silver:
        return t`100 coins (sp)`
      case CurrencyType.Gold:
        return t`100 coins (gp)`
      default:
        throw new Error('Unknown coins type')
    }
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
    const records = wallet
      ? items.concat(EncumbranceService.getCoinItems(wallet))
      : []
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

export default EncumbranceService
