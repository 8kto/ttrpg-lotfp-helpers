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
  describe('.createWalletFrom', () => {
    it('should create a wallet with the correct amount of copper', () => {
      const result = CurrencyConverter.createWalletFrom({
        coin: CurrencyType.Copper,
        value: 100,
      })
      expect(result).toEqual({ copper: 100, gold: 0, silver: 0 })
    })

    it('should create a wallet with the correct amount of silver', () => {
      const result = CurrencyConverter.createWalletFrom({
        coin: CurrencyType.Silver,
        value: 50,
      })
      expect(result).toEqual({ copper: 0, gold: 0, silver: 50 })
    })

    it('should create a wallet with the correct amount of gold', () => {
      const result = CurrencyConverter.createWalletFrom({
        coin: CurrencyType.Gold,
        value: 10,
      })
      expect(result).toEqual({ copper: 0, gold: 10, silver: 0 })
    })

    it('throws for unknown currency', () => {
      expect(() =>
        CurrencyConverter.createWalletFrom({
          // @ts-ignore
          coin: 'IMPOSSIBRU',
          value: 42,
        }),
      ).toThrow('Unknown currency type')
    })
  })

  describe('.add', () => {
    it('should correctly add copper to a wallet', () => {
      const wallet = { copper: 50, gold: 5, silver: 20 }
      const result = CurrencyConverter.add(
        { coin: CurrencyType.Copper, value: 100 },
        wallet,
      )
      expect(result).toEqual({ copper: 150, gold: 5, silver: 20 })
    })

    it('should correctly add silver to a wallet', () => {
      const wallet = { copper: 50, gold: 5, silver: 20 }
      const result = CurrencyConverter.add(
        { coin: CurrencyType.Silver, value: 30 },
        wallet,
      )
      expect(result).toEqual({ copper: 50, gold: 5, silver: 50 })
    })

    it('should correctly add gold to a wallet', () => {
      const wallet = { copper: 50, gold: 5, silver: 20 }
      const result = CurrencyConverter.add(
        { coin: CurrencyType.Gold, value: 2 },
        wallet,
      )
      expect(result).toEqual({ copper: 50, gold: 7, silver: 20 })
    })

    it('throws for unknown currency', () => {
      const wallet = { copper: 50, gold: 5, silver: 20 }

      expect(() =>
        CurrencyConverter.add(
          {
            // @ts-ignore
            coin: 'NOPE',
            value: 2,
          },
          wallet,
        ),
      ).toThrow('Unknown currency type')
    })
  })
})
