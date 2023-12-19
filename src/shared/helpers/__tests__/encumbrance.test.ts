import { Coin } from '@/domain'
import { Encumbrance, EncumbrancePoint } from '@/domain/encumbrance'
import { getCoinItems, getEncumbrance } from '@/shared/helpers/encumbrance'

describe('encumbrance helpers', () => {
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

  describe('getCoinItems', () => {
    const mockCountableItemCp = (length: number, lockedCost: number) => {
      return Array.from({ length }, () => {
        return {
          lockedCost: lockedCost / 10,
          name: '100 coins (cp)',
          points: EncumbrancePoint.Regular,
          qty: 1,
        }
      })
    }

    it.each([
      [100, 1],
      [200, 2],
      [250, 2],
      [1000, 10],
      [0, 0],
      [50, 0],
    ])('should return expected array of items for %d CP', (input, expectedLength) => {
      expect(getCoinItems(input, Coin.Copper)).toEqual(mockCountableItemCp(expectedLength, input))
    })
  })
})
