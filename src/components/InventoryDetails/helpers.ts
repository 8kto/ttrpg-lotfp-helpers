import type { ArmorItem } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { COINS_PER_ENCUMBRANCE_POINT } from '@/shared/helpers/encumbrance'
import { roundTo } from '@/shared/helpers/roundTo'

type CountableItem = Pick<
  InventoryItem<EquipmentItem>,
  'points' | 'lockedCost' | 'name' | 'qty'
>

const getCoinInventoryItems = (copperPieces: number) => {
  const coins = copperPieces / 10
  const coinsEncumbrance = Math.floor(coins / COINS_PER_ENCUMBRANCE_POINT)

  return Array.from({ length: coinsEncumbrance }, () => {
    return {
      lockedCost: 0,
      name: '100 coins',
      points: EncumbrancePoint.Regular,
      qty: 1,
    }
  })
}

/**
 * The first 5 items in the character list are not subject to encumbrance,
 * unless they are Armor or Oversized items.
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
  const records = items.concat(getCoinInventoryItems(copperPieces))

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
