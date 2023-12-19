import { Encumbrance } from '@/domain/encumbrance'

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
