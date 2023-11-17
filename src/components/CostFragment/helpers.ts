/**
 * NB does not handle negative numbers
 */
export const roundTo = (n: number, place: number) => {
  const offset = Math.pow(10, place)

  return Math.round((n + Number.EPSILON) * offset) / offset
}

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
