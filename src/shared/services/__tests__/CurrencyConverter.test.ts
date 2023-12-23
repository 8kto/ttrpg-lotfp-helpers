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
    it('should create a wallet with the correct amount of Copper', () => {
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

    it('should create a wallet with the correct amount of Silver', () => {
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

    it('should create a wallet with the correct amount of Gold', () => {
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
    it('should correctly add Copper to a wallet', () => {
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

    it('should correctly add Silver to a wallet', () => {
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

    it('should correctly add Gold to a wallet', () => {
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

  describe('.getDisplayCostFromWallet', () => {
    it('returns list of currencies', () => {
      expect(
        CurrencyConverter.getDisplayCostFromWallet({
          Copper: 4,
          Gold: 100,
          Silver: 89,
        }),
      ).toEqual([
        [100, 'gp'],
        [89, 'sp'],
        [4, 'cp'],
      ])
    })

    it('returns only present', () => {
      expect(
        CurrencyConverter.getDisplayCostFromWallet({
          Copper: 4,
          Gold: 0,
          Silver: 9,
        }),
      ).toEqual([
        [9, 'sp'],
        [4, 'cp'],
      ])
    })

    it('throws if wallet is invalid', () => {
      expect(() =>
        CurrencyConverter.getDisplayCostFromWallet({
          Copper: -4,
          Gold: 0,
          Silver: 9,
        }),
      ).toThrow('Invalid values in wallet')
    })
  })

  describe('.isValidWallet', () => {
    it('should return true for valid wallet', () => {
      expect(
        CurrencyConverter.isValidWallet({
          Copper: 4,
          Gold: 100,
          Silver: 89,
        }),
      ).toEqual(true)
    })

    it('should return true for partial', () => {
      expect(
        CurrencyConverter.isValidWallet({
          Copper: 0,
          Gold: 1,
          Silver: 0,
        }),
      ).toEqual(true)
    })

    it('should return false for negatives', () => {
      expect(
        CurrencyConverter.isValidWallet({
          Copper: 0,
          Gold: -1,
          Silver: 0,
        }),
      ).toEqual(false)
    })

    it('should return false for incomplete', () => {
      expect(
        CurrencyConverter.isValidWallet(
          // @ts-ignore
          { Copper: 10 },
        ),
      ).toEqual(false)
    })

    it('should return false for NaN', () => {
      expect(
        CurrencyConverter.isValidWallet({
          Copper: 1,
          Gold: 1,
          Silver: NaN,
        }),
      ).toEqual(false)
    })

    it('should return false for invalid prop names', () => {
      expect(
        CurrencyConverter.isValidWallet({
          // @ts-ignore
          copper: 30,
          gold: 20,
          silver: 10,
        }),
      ).toEqual(false)
    })
  })

  describe('.mergeWallets', () => {
    it('should correctly merge two wallets', () => {
      const wallet1: CurrencyWallet = { Copper: 100, Gold: 10, Silver: 50 }
      const wallet2: CurrencyWallet = { Copper: 200, Gold: 5, Silver: 30 }
      const mergedWallet = CurrencyConverter.mergeWallets(wallet1, wallet2)
      expect(mergedWallet).toEqual({ Copper: 300, Gold: 15, Silver: 80 })
    })

    it('should correctly merge two wallets with 0s', () => {
      const wallet1: CurrencyWallet = { Copper: 100, Gold: 10, Silver: 0 }
      const wallet2: CurrencyWallet = { Copper: 0, Gold: 5, Silver: 30 }
      const mergedWallet = CurrencyConverter.mergeWallets(wallet1, wallet2)
      expect(mergedWallet).toEqual({ Copper: 100, Gold: 15, Silver: 30 })
    })

    it('should handle empty wallet', () => {
      const wallet1: CurrencyWallet = { Copper: 0, Gold: 0, Silver: 0 }
      const wallet2: CurrencyWallet = { Copper: 100, Gold: 20, Silver: 50 }
      const mergedWallet = CurrencyConverter.mergeWallets(wallet1, wallet2)
      expect(mergedWallet).toEqual({ Copper: 100, Gold: 20, Silver: 50 })
    })

    it('should throw an error for invalid wallet', () => {
      const wallet1: CurrencyWallet = { Copper: -10, Gold: 10, Silver: 50 }
      const wallet2: CurrencyWallet = { Copper: 100, Gold: 5, Silver: 30 }
      expect(() => {
        CurrencyConverter.mergeWallets(wallet1, wallet2)
      }).toThrow('Invalid values in wallet')
    })
  })

  describe('.getNormalized', () => {
    it('should optimize wallet values', () => {
      const wallet: CurrencyWallet = { Copper: 1000, Gold: 10, Silver: 1000 }
      const optimizedWallet = CurrencyConverter.getNormalized(wallet)
      expect(optimizedWallet).toEqual({ Copper: 0, Gold: 32, Silver: 0 })
    })

    it('should optimize wallet mixed values', () => {
      const wallet: CurrencyWallet = { Copper: 5, Gold: 1, Silver: 54 }
      const optimizedWallet = CurrencyConverter.getNormalized(wallet)
      expect(optimizedWallet).toEqual({ Copper: 5, Gold: 2, Silver: 4 })
    })

    it('should handle wallet with only copper', () => {
      const wallet: CurrencyWallet = { Copper: 1500, Gold: 0, Silver: 0 }
      const optimizedWallet = CurrencyConverter.getNormalized(wallet)
      expect(optimizedWallet).toEqual({ Copper: 0, Gold: 3, Silver: 0 })
    })

    it('should handle wallet with only silver', () => {
      const wallet: CurrencyWallet = { Copper: 0, Gold: 0, Silver: 150 }
      const optimizedWallet = CurrencyConverter.getNormalized(wallet)
      expect(optimizedWallet).toEqual({ Copper: 0, Gold: 3, Silver: 0 })
    })

    it('should handle wallet with only gold', () => {
      const wallet: CurrencyWallet = { Copper: 0, Gold: 5, Silver: 0 }
      const optimizedWallet = CurrencyConverter.getNormalized(wallet)
      expect(optimizedWallet).toEqual({ Copper: 0, Gold: 5, Silver: 0 })
    })

    it('should handle empty wallet', () => {
      const wallet: CurrencyWallet = { Copper: 0, Gold: 0, Silver: 0 }
      const optimizedWallet = CurrencyConverter.getNormalized(wallet)
      expect(optimizedWallet).toEqual({ Copper: 0, Gold: 0, Silver: 0 })
    })
  })
})
