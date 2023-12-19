import { CurrencyType } from '@/domain/currency'
import CurrencyConverter from '@/shared/services/CurrencyConverter'

describe('CurrencyConverter', () => {
  describe('.convertFromTo', () => {
    // Define test cases for each permutation
    const testCases = [
      { expected: 1, from: CurrencyType.Gold, to: CurrencyType.Gold, value: 1 },
      {
        expected: 50,
        from: CurrencyType.Gold,
        to: CurrencyType.Silver,
        value: 1,
      },
      {
        expected: 500,
        from: CurrencyType.Gold,
        to: CurrencyType.Copper,
        value: 1,
      },
      {
        expected: 1,
        from: CurrencyType.Silver,
        to: CurrencyType.Gold,
        value: 50,
      },
      {
        expected: 1,
        from: CurrencyType.Silver,
        to: CurrencyType.Silver,
        value: 1,
      },
      {
        expected: 10,
        from: CurrencyType.Silver,
        to: CurrencyType.Copper,
        value: 1,
      },
      {
        expected: 1,
        from: CurrencyType.Copper,
        to: CurrencyType.Gold,
        value: 500,
      },
      {
        expected: 1,
        from: CurrencyType.Copper,
        to: CurrencyType.Silver,
        value: 10,
      },
      {
        expected: 1,
        from: CurrencyType.Copper,
        to: CurrencyType.Copper,
        value: 1,
      },
    ]

    testCases.forEach(({ expected, from, to, value }) => {
      it(`should correctly convert ${value} ${from} to ${expected} ${to}`, () => {
        const result = CurrencyConverter.convertFromTo(
          { coin: from, value },
          to,
        )
        expect(result).toStrictEqual({
          coin: to,
          value: expected,
        })
      })
    })
  })
})
