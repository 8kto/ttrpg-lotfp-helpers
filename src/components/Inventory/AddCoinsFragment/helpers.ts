import { EncumbrancePoint } from '@/domain/encumbrance'

const COINS_PER_ENCUMBRANCE_POINT = 100

export const getCoinsEncumbrance = (copperCoins: number) => {
  return (
    Math.floor(copperCoins / COINS_PER_ENCUMBRANCE_POINT) *
    EncumbrancePoint.Regular
  )
}
