/* eslint-disable sort-keys-fix/sort-keys-fix */
import { CurrencyType } from '@/domain/currency'
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
    const mockCountableItemCp = (length: number) => {
      return Array.from({ length }, () => {
        return {
          lockedCostCp: 0,
          name: '100 coins (cp)',
          points: EncumbrancePoint.Regular,
          qty: 1,
        }
      })
    }
    const getMockFor = (type: CurrencyType) => {
      let title
      switch (type) {
        case CurrencyType.Copper:
          title = '100 coins (cp)'
          break
        case CurrencyType.Silver:
          title = '100 coins (sp)'
          break
        case CurrencyType.Gold:
          title = '100 coins (gp)'
          break
        default:
          throw new Error('Unknown currency type')
      }

      return {
        lockedCostCp: 0,
        name: title,
        points: EncumbrancePoint.Regular,
        qty: 1,
      }
    }

    it.each([
      [100, 1],
      [200, 2],
      [250, 2],
      [1000, 10],
      [0, 0],
      [50, 0],
    ])(
      'should return expected array of items for %d CP',
      (input, expectedLength) => {
        expect(
          getCoinItems({
            Copper: input,
            Gold: 0,
            Silver: 0,
          }),
        ).toEqual(mockCountableItemCp(expectedLength))
      },
    )

    it('should compile items', () => {
      expect(
        getCoinItems({
          Copper: 100,
          Silver: 100,
          Gold: 100,
        }),
      ).toEqual([
        getMockFor(CurrencyType.Copper),
        getMockFor(CurrencyType.Silver),
        getMockFor(CurrencyType.Gold),
      ])
    })

    it('should compile mixed set', () => {
      expect(
        getCoinItems({
          Copper: 200,
          Silver: 10,
          Gold: 1000,
        }),
      ).toEqual([
        ...Array.from({ length: 2 }, () => getMockFor(CurrencyType.Copper)),
        ...Array.from({ length: 10 }, () => getMockFor(CurrencyType.Gold)),
      ])
    })

    it('should ignore items < 100', () => {
      expect(
        getCoinItems({
          Copper: 20,
          Silver: 10,
          Gold: 99,
        }),
      ).toEqual([])
    })

    it('should round down', () => {
      expect(
        getCoinItems({
          Copper: 299,
          Silver: 560,
          Gold: 115,
        }),
      ).toEqual([
        ...Array.from({ length: 2 }, () => getMockFor(CurrencyType.Copper)),
        ...Array.from({ length: 5 }, () => getMockFor(CurrencyType.Silver)),
        ...Array.from({ length: 1 }, () => getMockFor(CurrencyType.Gold)),
      ])
    })
  })
})
