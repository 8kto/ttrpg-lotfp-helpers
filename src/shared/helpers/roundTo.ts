/**
 * NB does not handle negative numbers
 */
export const roundTo = (n: number, place: number) => {
  const offset = Math.pow(10, place)

  return Math.round((n + Number.EPSILON) * offset) / offset
}
