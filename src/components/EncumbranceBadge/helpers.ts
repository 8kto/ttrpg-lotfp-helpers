import {Encumbrance} from "@/shared/types/encumbrance"

// TODO tests
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