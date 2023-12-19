import { Encumbrance } from '@/domain/encumbrance'
import { getEncumbrance } from '@/shared/helpers/encumbrance'

describe('getEncumbrance', () => {
  it.each([
    [0, Encumbrance.Unencumbered],
    [1.8, Encumbrance.Unencumbered],
    [2, Encumbrance.Lightly],
    [2.8, Encumbrance.Lightly],
    [3, Encumbrance.Heavily],
    [3.8, Encumbrance.Heavily],
    [4, Encumbrance.Severely],
    [4.8, Encumbrance.Severely],
    [5, Encumbrance.OverEncumbered],
    [100, Encumbrance.OverEncumbered],
  ])('should return %d -> %s', (input, expected) => {
    expect(getEncumbrance(input)).toEqual(expected)
  })
})
