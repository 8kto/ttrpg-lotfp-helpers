import type {EquipmentItem} from "@/shared/types"
import { Encumbrance } from '@/shared/types/encumbrance'

export const getEncumbrance = (points: number): Encumbrance => {
  if (points >= 26) {
    return Encumbrance.OverEncumbered
  }
  if (points >= 21) {
    return Encumbrance.Severely
  }
  if (points >= 16) {
    return Encumbrance.Heavily
  }
  if (points >= 11) {
    return Encumbrance.Lightly
  }

  return Encumbrance.Unencumbered
}

export const getTotal = (items: Array<EquipmentItem>) => {
  return items.reduce(
    (totals, item) => {
      return {
        totalCost: totals.totalCost + (item.cityCost || 0),
        totalPoints: totals.totalPoints + item.points,
      }
    },
    { totalCost: 0, totalPoints: 0 },
  )
}