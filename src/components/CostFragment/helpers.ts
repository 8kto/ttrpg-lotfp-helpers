import { roundTo } from '@/shared/helpers/roundTo'

export const getCoins = (
  cost: number,
): {
  copperPoints: number
  silverPoints: number
} => {
  const roundedCost = roundTo(cost, 1)
  const silverPoints = Math.floor(roundedCost)
  const copperPoints = (roundedCost - silverPoints) * 10

  return {
    copperPoints: copperPoints
      ? Number(((roundedCost - silverPoints) * 10).toFixed(0))
      : 0,
    silverPoints,
  }
}
