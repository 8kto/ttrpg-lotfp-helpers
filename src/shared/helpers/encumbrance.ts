import { t } from '@lingui/macro'

import { Coin } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { roundTo } from '@/shared/helpers/roundTo'

export type CountableItem = Pick<
  InventoryItem<EquipmentItem>,
  'points' | 'lockedCost' | 'name' | 'qty'
>

export const COINS_PER_ENCUMBRANCE_POINT = 100

export const getEncumbrance = (points: number): Encumbrance => {
  if (points >= 5) {
    return Encumbrance.OverEncumbered
  }
  if (points >= 4) {
    return Encumbrance.Severely
  }
  if (points >= 3) {
    return Encumbrance.Heavily
  }
  if (points >= 2) {
    return Encumbrance.Lightly
  }

  return Encumbrance.Unencumbered
}

const getCoinsLockedCost = (type: Coin) => {
  switch (type) {
    case Coin.Copper:
      return t`100 coins (cp)`
    case Coin.Silver:
      return t`100 coins (sp)`
    case Coin.Gold:
      return t`100 coins (gp)`
    default:
      throw new Error('Unknown coins type')
  }
}

/**
 * Convert coins number into an array of CountableItem, weight is rounded down
 */
export const getCoinItems = (
  coins: number,
  type: Coin,
): Array<CountableItem> => {
  const coinsEncumbrance = Math.floor(coins / COINS_PER_ENCUMBRANCE_POINT)

  return Array.from({ length: coinsEncumbrance }, () => {
    return {
      lockedCost: 0,
      name: getCoinsLockedCost(type),
      points: EncumbrancePoint.Regular,
      qty: 1,
    }
  })
}
/**
 * The first X (5 for regular characters, 10 for dwarves) items in the character list
 * are not subject to encumbrance, unless they are Armor or Oversized items.
 */
const skipFirstItems = () => {
  let nonEncumberedItemsCount = 5

  return (item: CountableItem): boolean => {
    const res =
      nonEncumberedItemsCount > 0 &&
      item.points === EncumbrancePoint.Regular &&
      !(item as InventoryItem<ArmorItem>).armorClass

    if (res) {
      nonEncumberedItemsCount -= item.qty
    }

    return res
  }
}

export const getTotal = (
  items: ReadonlyArray<CountableItem>,
  coinsCp: number,
) => {
  // FIXME pass over the remained num e.g. -2
  const shouldSkip = skipFirstItems()
  const records = items.concat(getCoinItems(coinsCp, Coin.Copper))

  const res = records.reduce(
    (totals, item) => {
      const { lockedCost, points, qty } = item

      return {
        totalCostSp: totals.totalCostSp + lockedCost * qty,
        totalEncumbrancePoints:
          totals.totalEncumbrancePoints + (shouldSkip(item) ? 0 : points * qty),
      }
    },
    { totalCostSp: 0, totalEncumbrancePoints: 0 },
  )

  return {
    totalCostSp: res.totalCostSp,
    totalEncumbrancePoints: roundTo(res.totalEncumbrancePoints, 1),
  }
}
