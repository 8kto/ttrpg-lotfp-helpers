import { t } from '@lingui/macro'

import { CurrencyType } from '@/domain/currency'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'

export type CountableItem = Pick<
  InventoryItem<EquipmentItem>,
  'points' | 'lockedCostCp' | 'name' | 'qty'
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

const getCoinsLockedCost = (type: CurrencyType) => {
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
 * Convert coins number into an array of CountableItem, weight is rounded down
 */
export const getCoinItems = (
  coins: number,
  type: CurrencyType,
): Array<CountableItem> => {
  const coinsEncumbrance = Math.floor(coins / COINS_PER_ENCUMBRANCE_POINT)

  return Array.from({ length: coinsEncumbrance }, () => {
    return {
      lockedCostCp: 0,
      name: getCoinsLockedCost(type),
      points: EncumbrancePoint.Regular,
      qty: 1,
    }
  })
}
