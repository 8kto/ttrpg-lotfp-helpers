import { roundTo } from '@/shared/helpers/roundTo'

/**
 * TODO merge with CurrencyConverter
 * @deprecated
 */
export const getCoins = (
  costSp: number,
): {
  copperPoints: number
  silverPoints: number
} => {
  const roundedCost = roundTo(costSp, 1)
  const silverPoints = Math.floor(roundedCost)
  const copperPoints = (roundedCost - silverPoints) * 10

  return {
    copperPoints: copperPoints
      ? Number(((roundedCost - silverPoints) * 10).toFixed(0))
      : 0,
    silverPoints,
  }
}
