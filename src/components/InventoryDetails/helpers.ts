import type { EquipmentItem, InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'

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

export const getTotal = (items: Array<InventoryItem<EquipmentItem>>) => {
  // The first 5 items in the character list are not subject to encumbrance,
  // unless they are Armor or Oversized items.
  let nonEncumberedItemsCount = 5
  const shouldSkip = (item: InventoryItem<EquipmentItem>): boolean => {
    const res =
      nonEncumberedItemsCount > 0 &&
      item.points === EncumbrancePoint.Regular &&
      !(item as InventoryItem<ArmorItem>).armorClass

    if (res) {
      nonEncumberedItemsCount--
    }

    return res
  }

  return items.reduce(
    (totals, item) => {
      return {
        totalCost: totals.totalCost + item.lockedCost,
        totalEncumbrancePoints:
          totals.totalEncumbrancePoints + (shouldSkip(item) ? 0 : item.points),
      }
    },
    { totalCost: 0, totalEncumbrancePoints: 0 },
  )
}
