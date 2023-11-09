import {getEncumbrance} from "@/components/EncumbranceBadge/helpers"
import {Encumbrance} from "@/shared/types/encumbrance"

describe('helpers', () => {
  describe('getEncumbrance', () => {
    it.each([
      [0, Encumbrance.Unencumbered],
      [10, Encumbrance.Unencumbered],
      [11, Encumbrance.Lightly],
      [15, Encumbrance.Lightly],
      [16, Encumbrance.Heavily],
      [20, Encumbrance.Heavily],
      [21, Encumbrance.Severely],
      [25, Encumbrance.Severely],
      [26, Encumbrance.OverEncumbered],
      [30, Encumbrance.OverEncumbered],
    ])('should return %d -> %s', (input, expected) => {
      expect(getEncumbrance(input)).toEqual(expected)
    })
  })
})