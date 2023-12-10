import type { ArmorItem } from '@/domain/armor'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { roundTo } from '@/shared/helpers/roundTo'

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

type CountableItem = Pick<
  InventoryItem<EquipmentItem>,
  'points' | 'lockedCost' | 'name'
>

const COINS_PER_ENCUMBRANCE_POINT = 100

const getCoinInventoryItems = (copperPieces: number) => {
  const coins = copperPieces / 10
  const coinsEncumbrance = Math.floor(coins / COINS_PER_ENCUMBRANCE_POINT)

  return Array.from({ length: coinsEncumbrance }, () => {
    return {
      lockedCost: 0,
      name: '100 coins',
      points: EncumbrancePoint.Regular,
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
      nonEncumberedItemsCount--
    }

    return res
  }
}

export const getTotal = (items: Array<CountableItem>, copperPieces: number) => {
  const shouldSkip = skipFirstItems()
  const records = items.concat(getCoinInventoryItems(copperPieces))

  const res = records.reduce(
    (totals, item) => {
      return {
        totalCost: totals.totalCost + item.lockedCost,
        totalEncumbrancePoints:
          totals.totalEncumbrancePoints + (shouldSkip(item) ? 0 : item.points),
      }
    },
    { totalCost: 0, totalEncumbrancePoints: 0 },
  )

  return {
    totalCost: res.totalCost,
    totalEncumbrancePoints: roundTo(res.totalEncumbrancePoints, 1),
  }
}
