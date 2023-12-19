import { Coin } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { InventoryItem } from '@/domain/inventory'
import type { CountableItem } from '@/shared/helpers/encumbrance'
import { getCoinItems } from '@/shared/helpers/encumbrance'
import { roundTo } from '@/shared/helpers/roundTo'

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

export const getTotal = (items: Array<CountableItem>, copperPieces: number) => {
  // FIXME pass over the remained num e.g. -2
  const shouldSkip = skipFirstItems()
  const records = items.concat(getCoinItems(copperPieces, Coin.Copper))

  const res = records.reduce(
    (totals, item) => {
      const { lockedCost, points, qty } = item

      return {
        totalCost: totals.totalCost + lockedCost * qty,
        totalEncumbrancePoints:
          totals.totalEncumbrancePoints + (shouldSkip(item) ? 0 : points * qty),
      }
    },
    { totalCost: 0, totalEncumbrancePoints: 0 },
  )

  return {
    totalCost: res.totalCost,
    totalEncumbrancePoints: roundTo(res.totalEncumbrancePoints, 1),
  }
}
