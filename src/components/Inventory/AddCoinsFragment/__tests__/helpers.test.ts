import { getCoinsEncumbrance } from '@/components/Inventory/AddCoinsFragment/helpers'
import { EncumbrancePoint } from '@/domain/encumbrance'

describe('AddCoinsFragment helpers', () => {
  describe('getCoinsEncumbrance', () => {
    it.each([
      [100, EncumbrancePoint.Regular],
      [450, EncumbrancePoint.Regular * 4],
      [200, EncumbrancePoint.Regular * 2],
      [20, EncumbrancePoint.None],
      [120, EncumbrancePoint.Regular],
      [35000, EncumbrancePoint.Regular * 350],
      [1000, EncumbrancePoint.Regular * 10],
      [0, EncumbrancePoint.None],
      [1, EncumbrancePoint.None],
    ])('should return: input=%j expected=%j', (input, expected) => {
      expect(getCoinsEncumbrance(input)).toEqual(expected)
    })
  })
})
