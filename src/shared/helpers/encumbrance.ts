import { t } from '@lingui/macro'

import { Coin } from '@/domain'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { normalizeCoins } from '@/shared/helpers/costs'

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
export const getCoinItems = (coins: number, type: Coin): Array<CountableItem> => {
  const baseCoins = normalizeCoins(coins, type)
  const coinsEncumbrance = Math.floor(coins / COINS_PER_ENCUMBRANCE_POINT)

  return Array.from({ length: coinsEncumbrance }, () => {
    return {
      lockedCost: baseCoins,
      name: getCoinsLockedCost(type),
      points: EncumbrancePoint.Regular,
      qty: 1,
    }
  })
}
