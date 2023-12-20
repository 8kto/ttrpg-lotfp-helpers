import type { CurrencyRecord, CurrencyWallet } from '@/domain/currency'
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
          { currency: from, value },
          to,
        )
        expect(result).toStrictEqual({
          currency: to,
          value: expected,
        } as CurrencyRecord)
      })
    })
  })
  describe('.createWalletFrom', () => {
    it('should create a wallet with the correct amount of copper', () => {
      const result = CurrencyConverter.createWalletFrom({
        currency: CurrencyType.Copper,
        value: 100,
      })
      expect(result).toEqual({
        Copper: 100,
        Gold: 0,
        Silver: 0,
      } as CurrencyWallet)
    })

    it('should create a wallet with the correct amount of silver', () => {
      const result = CurrencyConverter.createWalletFrom({
        currency: CurrencyType.Silver,
        value: 50,
      })
      expect(result).toEqual({
        Copper: 0,
        Gold: 0,
        Silver: 50,
      } as CurrencyWallet)
    })

    it('should create a wallet with the correct amount of gold', () => {
      const result = CurrencyConverter.createWalletFrom({
        currency: CurrencyType.Gold,
        value: 10,
      })
      expect(result).toEqual({
        Copper: 0,
        Gold: 10,
        Silver: 0,
      } as CurrencyWallet)
    })

    it('throws for unknown currency', () => {
      expect(() =>
        CurrencyConverter.createWalletFrom({
          // @ts-ignore
          currency: 'IMPOSSIBRU',
          value: 42,
        }),
      ).toThrow('Unknown currency type')
    })
  })

  describe('.add', () => {
    it('should correctly add copper to a wallet', () => {
      const wallet: CurrencyWallet = { Copper: 50, Gold: 5, Silver: 20 }
      const result = CurrencyConverter.add(
        { currency: CurrencyType.Copper, value: 100 },
        wallet,
      )
      expect(result).toEqual({
        Copper: 150,
        Gold: 5,
        Silver: 20,
      } as CurrencyWallet)
    })

    it('should correctly add silver to a wallet', () => {
      const wallet: CurrencyWallet = { Copper: 50, Gold: 5, Silver: 20 }
      const result = CurrencyConverter.add(
        { currency: CurrencyType.Silver, value: 30 },
        wallet,
      )
      expect(result).toEqual({
        Copper: 50,
        Gold: 5,
        Silver: 50,
      } as CurrencyWallet)
    })

    it('should correctly add gold to a wallet', () => {
      const wallet: CurrencyWallet = { Copper: 50, Gold: 5, Silver: 20 }
      const result = CurrencyConverter.add(
        { currency: CurrencyType.Gold, value: 2 },
        wallet,
      )
      expect(result).toEqual({
        Copper: 50,
        Gold: 7,
        Silver: 20,
      } as CurrencyWallet)
    })

    it('throws for unknown currency', () => {
      const wallet: CurrencyWallet = { Copper: 50, Gold: 5, Silver: 20 }

      expect(() =>
        CurrencyConverter.add(
          {
            // @ts-ignore
            currency: 'NOPE',
            value: 2,
          },
          wallet,
        ),
      ).toThrow('Unknown currency type')
    })
  })
})
