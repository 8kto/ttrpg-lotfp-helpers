import { EncumbrancePoint } from '@/domain/encumbrance'

const COINS_PER_ENCUMBRANCE_POINT = 100

/**
 * Regardless of type, every `COINS_PER_ENCUMBRANCE_POINT` occupies one inventory slot (PCB)
 */
export const getCoinsEncumbrance = (coins: number) => {
  return (
    Math.floor(coins / COINS_PER_ENCUMBRANCE_POINT) * EncumbrancePoint.Regular
  )
}
