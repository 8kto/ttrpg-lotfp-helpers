import type { EquipmentItem, InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'

export const getEncumbrance = (points: number): Encumbrance => {
  // if (points >= 26) {
  //   return Encumbrance.OverEncumbered
  // }
  // if (points >= 21) {
  //   return Encumbrance.Severely
  // }
  // if (points >= 16) {
  //   return Encumbrance.Heavily
  // }
  // if (points >= 11) {
  //   return Encumbrance.Lightly
  // }

  if (points >= 5) {
    return Encumbrance.OverEncumbered
  }
  if (points === 4) {
    return Encumbrance.Severely
  }
  if (points === 3) {
    return Encumbrance.Heavily
  }
  if (points === 2) {
    return Encumbrance.Lightly
  }

  // FIXME 5 first items are free of encumbrance

  return Encumbrance.Unencumbered
}

const shouldConsiderFactor = (item: InventoryItem<EquipmentItem>): boolean => {
  return (
    item.points === EncumbrancePoint.Regular &&
    !(item as InventoryItem<ArmorItem>).armorClass
  )
}

export const getTotal = (items: Array<InventoryItem<EquipmentItem>>) => {
  // In character list, first 5 items are free of encumbrance
  // (those that are not of Armor as Oversized items)
  let factor = -5

  return items.reduce(
    (totals, item) => {
      return {
        totalCost: totals.totalCost + item.lockedCost,
        totalEncumbrancePoints:
          totals.totalEncumbrancePoints +
          (shouldConsiderFactor(item) && !factor-- ? item.points : 0),
      }
    },
    { totalCost: 0, totalEncumbrancePoints: 0 },
  )
}
