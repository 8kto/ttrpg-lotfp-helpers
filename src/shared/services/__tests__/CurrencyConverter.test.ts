/* eslint-disable sort-keys-fix/sort-keys-fix */

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

    it('should throw for unknown CurrencyType from', () => {
      expect(() =>
        CurrencyConverter.convertFromTo(
          {
            // @ts-ignore
            currency: 'XXX',
            value: 10,
          },
          CurrencyType.Silver,
        ),
      ).toThrow('Unknown currency type')
    })

    it('should throw for unknown CurrencyType to', () => {
      expect(() =>
        CurrencyConverter.convertFromTo(
          {
            currency: CurrencyType.Gold,
            value: 10,
          },
          // @ts-ignore
          'XXX',
        ),
      ).toThrow('Unknown currency type')
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
      ).toThrow('Unknown currency record type')
    })
  })

  describe('.add', () => {
    it.each([
      [CurrencyType.Copper, 100, { Copper: 150, Gold: 5, Silver: 20 }],
      [CurrencyType.Silver, 30, { Copper: 50, Gold: 5, Silver: 50 }],
      [CurrencyType.Gold, 2, { Copper: 50, Gold: 7, Silver: 20 }],
    ])('should correctly add %s to a wallet', (currency, value, expected) => {
      const wallet: CurrencyWallet = { Copper: 50, Gold: 5, Silver: 20 }
      const result = CurrencyConverter.add({ currency, value }, wallet)
      expect(result).toEqual(expected as CurrencyWallet)
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
      ).toThrow('Unknown currency record type')
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

    it('throws if Invalid wallet', () => {
      expect(() =>
        CurrencyConverter.getDisplayCostFromWallet({
          Copper: -4,
          Gold: 0,
          Silver: 9,
        }),
      ).toThrow('Invalid wallet')
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

    it('should throw for invalid newWallet', () => {
      expect(() =>
        CurrencyConverter.mergeWallets(
          {
            Copper: 1,
          } as CurrencyWallet,
          {
            Copper: 1,
            Gold: 0,
            Silver: 10,
          },
        ),
      ).toThrow('Invalid wallet')
    })

    it('should throw for invalid wallet', () => {
      expect(() =>
        CurrencyConverter.mergeWallets(
          {
            Copper: 1,
            Gold: 0,
            Silver: 10,
          },
          {
            Copper: 1,
          } as CurrencyWallet,
        ),
      ).toThrow('Invalid wallet')
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
      }).toThrow('Invalid wallet')
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

    it('should optimize wallet mixed values (2)', () => {
      const wallet: CurrencyWallet = { Copper: 1250, Gold: 0, Silver: 0 }
      const optimizedWallet = CurrencyConverter.getNormalized(wallet)
      expect(optimizedWallet).toEqual({ Copper: 0, Silver: 25, Gold: 2 })
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

    it('should throw for invalid wallet', () => {
      expect(() =>
        CurrencyConverter.getNormalized({ Copper: 0 } as CurrencyWallet),
      ).toThrow('Invalid wallet')
    })
  })

  describe('.getDisplayCost', () => {
    it('converts into the default currency from CP', () => {
      expect(
        CurrencyConverter.getDisplayCost({
          currency: CurrencyType.Copper,
          value: 1000,
        }),
      ).toEqual({ currency: 'Silver', value: 100 })
    })

    it('converts into the default currency from SP', () => {
      expect(
        CurrencyConverter.getDisplayCost({
          currency: CurrencyType.Silver,
          value: 1000,
        }),
      ).toEqual({ currency: 'Silver', value: 1000 })
    })

    it('converts into the default currency from GP', () => {
      expect(
        CurrencyConverter.getDisplayCost({
          currency: CurrencyType.Gold,
          value: 1000,
        }),
      ).toEqual({ currency: 'Silver', value: 50000 })
    })
  })

  describe('.isWalletEmpty', () => {
    it('returns true', () => {
      expect(
        CurrencyConverter.isWalletEmpty({
          Copper: 0,
          Gold: 0,
          Silver: 0,
        }),
      ).toEqual(true)
    })

    it('returns false', () => {
      expect(
        CurrencyConverter.isWalletEmpty({
          Copper: 0,
          Gold: 10,
          Silver: 0,
        }),
      ).toEqual(false)
    })
  })

  describe('.getWalletValue', () => {
    it('returns value for Copper', () => {
      expect(
        CurrencyConverter.getWalletValue(
          {
            Copper: 12,
            Gold: 0,
            Silver: 0,
          },
          CurrencyType.Copper,
        ),
      ).toEqual({ currency: 'Copper', value: 12 })
      expect(
        CurrencyConverter.getWalletValue(
          {
            Copper: 0,
            Gold: 110,
            Silver: 0,
          },
          CurrencyType.Copper,
        ),
      ).toEqual({ currency: 'Copper', value: 55000 })
      expect(
        CurrencyConverter.getWalletValue(
          {
            Copper: 0,
            Gold: 0,
            Silver: 5,
          },
          CurrencyType.Copper,
        ),
      ).toEqual({ currency: 'Copper', value: 50 })
    })

    it.each([
      [CurrencyType.Copper, 5063],
      [CurrencyType.Silver, 506.3 /* 5063 / 10 */],
      [CurrencyType.Gold, 10.126 /* 506.3 / 50 */],
    ])('returns value for mixed currencies (%s %d)', (ctype, value) => {
      expect(
        CurrencyConverter.getWalletValue(
          {
            Copper: 23,
            Silver: 4, // 40 cp
            Gold: 10, // 500sp = 5000cp
          }, // 5000 + 40 + 23 = 5063cp
          ctype,
        ),
      ).toEqual({ currency: ctype, value })
    })

    it('should throw for invalid wallet', () => {
      expect(() =>
        CurrencyConverter.getWalletValue(
          { Copper: 0 } as CurrencyWallet,
          CurrencyType.Gold,
        ),
      ).toThrow('Invalid wallet')
    })
  })

  describe('.hasEnoughFundsInWallet', () => {
    it('returns true', () => {
      expect(
        CurrencyConverter.hasEnoughFundsInWallet(
          { value: 10, currency: CurrencyType.Copper },
          {
            Copper: 12,
            Gold: 0,
            Silver: 0,
          },
        ),
      ).toEqual(true)
      expect(
        CurrencyConverter.hasEnoughFundsInWallet(
          { value: 10, currency: CurrencyType.Gold },
          {
            Copper: 0,
            Gold: 110,
            Silver: 0,
          },
        ),
      ).toEqual(true)
      expect(
        CurrencyConverter.hasEnoughFundsInWallet(
          { value: 1, currency: CurrencyType.Silver },
          {
            Copper: 0,
            Gold: 0,
            Silver: 5,
          },
        ),
      ).toEqual(true)
    })

    it.each([
      [CurrencyType.Copper, 1],
      [CurrencyType.Silver, 1],
      [CurrencyType.Gold, 1],
    ])('returns false for mixed currencies (%j %j)', (ctype, value) => {
      expect(
        CurrencyConverter.hasEnoughFundsInWallet(
          { currency: ctype, value },
          {
            Copper: 0,
            Silver: 0,
            Gold: 0,
          },
        ),
      ).toEqual(false)
    })

    it.each([
      [CurrencyType.Copper, 5000, true],
      [CurrencyType.Copper, 5064, false],
      [CurrencyType.Copper, 60, true],
      [CurrencyType.Silver, 500, true],
      [CurrencyType.Silver, 507, false],
      [CurrencyType.Gold, 10, true],
      [CurrencyType.Gold, 10.5, false],
    ])(
      'returns expected for mixed currencies (%j, %j, %j)',
      (ctype, value, expected) => {
        expect(
          CurrencyConverter.hasEnoughFundsInWallet(
            { currency: ctype, value },
            {
              Copper: 23,
              Silver: 4, // 40 cp
              Gold: 10, // 500sp = 5000cp
            }, // 5000 + 40 + 23 = 5063cp / 506.3sp / 10.126gp
          ),
        ).toEqual(expected)
      },
    )

    it('should throw for invalid wallet', () => {
      expect(() =>
        CurrencyConverter.hasEnoughFundsInWallet(
          { currency: CurrencyType.Copper, value: 10 },
          { Copper: 0 } as CurrencyWallet,
        ),
      ).toThrow('Invalid wallet')
    })

    it('should throw for invalid record', () => {
      expect(() =>
        CurrencyConverter.hasEnoughFundsInWallet(
          { currency: 'XXX' as CurrencyType, value: 10 },
          {
            Copper: 0,
            Silver: 0,
            Gold: 0,
          },
        ),
      ).toThrow('Unknown currency record type')
    })
  })

  describe('.subtract', () => {
    const wallet: CurrencyWallet = {
      Copper: 50, // 50cp   == 5sp   == 0.1gp
      Silver: 20, // 200cp  == 20sp  == 0.4gp
      Gold: 5, // 2500cp == 250sp == 5gp
      // Total:      2750cp == 275sp == 5.5gp
    }

    it.each([
      [CurrencyType.Copper, 50, { Copper: 0, Silver: 20, Gold: 5 }],
      [CurrencyType.Silver, 10, { Copper: 50, Silver: 10, Gold: 5 }],
      [CurrencyType.Gold, 2, { Copper: 50, Silver: 20, Gold: 3 }],
    ])(
      'should correctly subtract %s from wallet',
      (currency, value, expected) => {
        const result = CurrencyConverter.subtract({ currency, value }, wallet)
        expect(result).toEqual(expected as CurrencyWallet)
      },
    )

    it.each([
      [CurrencyType.Copper, 60, { Copper: 0, Silver: 19, Gold: 5 }],
      [CurrencyType.Copper, 750, { Copper: 0, Silver: 0, Gold: 4 }],
      [CurrencyType.Copper, 2750, { Copper: 0, Silver: 0, Gold: 0 }],
      [CurrencyType.Silver, 275, { Copper: 0, Silver: 0, Gold: 0 }],
      [CurrencyType.Silver, 20, { Copper: 50, Silver: 0, Gold: 5 }],
      [CurrencyType.Silver, 260, { Copper: 0, Silver: 15, Gold: 0 }],
    ])(
      'should support mixed values and remains (%j %j)',
      (currency, value, expected) => {
        const result = CurrencyConverter.subtract({ currency, value }, wallet)
        expect(result).toEqual(expected as CurrencyWallet)
      },
    )

    it.each([
      // To Silver
      [259, { Copper: 0, Silver: 16, Gold: 0 }],
      [258, { Copper: 0, Silver: 17, Gold: 0 }],
      [257, { Copper: 0, Silver: 18, Gold: 0 }],
      [256, { Copper: 0, Silver: 19, Gold: 0 }],
      [255, { Copper: 0, Silver: 20, Gold: 0 }],
      [254, { Copper: 0, Silver: 21, Gold: 0 }],
      [253, { Copper: 0, Silver: 22, Gold: 0 }],
      [252, { Copper: 0, Silver: 23, Gold: 0 }],
      [251, { Copper: 0, Silver: 24, Gold: 0 }],
      [250, { Copper: 0, Silver: 25, Gold: 0 }],
    ])('correctly reshuffles remains for Silver (%j)', (value, expected) => {
      const result = CurrencyConverter.subtract(
        { currency: CurrencyType.Silver, value },
        wallet,
      )
      expect(result).toEqual(expected as CurrencyWallet)
    })

    it.each([
      [495, { Copper: 5, Silver: 55, Gold: 0 }],
      [494, { Copper: 6, Silver: 55, Gold: 0 }],
      [493, { Copper: 7, Silver: 55, Gold: 0 }],
      [492, { Copper: 8, Silver: 55, Gold: 0 }],
      [491, { Copper: 9, Silver: 55, Gold: 0 }],
      [490, { Copper: 0, Silver: 56, Gold: 0 }],
      [489, { Copper: 1, Silver: 56, Gold: 0 }],
      [488, { Copper: 2, Silver: 56, Gold: 0 }],
      [487, { Copper: 3, Silver: 56, Gold: 0 }],
      [486, { Copper: 4, Silver: 56, Gold: 0 }],
    ])('correctly reshuffles remains for Copper (%j)', (value, expected) => {
      const walletMock: CurrencyWallet = {
        Copper: 50, // 50cp   == 5sp   == 0.1gp
        Silver: 100, // 1000cp  == 100sp  == 2gp
        Gold: 0,
        // Total:      1050cp == 105sp == 2.1gp
      }

      const result = CurrencyConverter.subtract(
        { currency: CurrencyType.Copper, value },
        walletMock,
      )
      expect(result).toEqual(expected as CurrencyWallet)
    })

    it('throws for unknown currency', () => {
      expect(() =>
        CurrencyConverter.subtract(
          {
            currency: 'NOPE' as CurrencyType,
            value: 2,
          },
          wallet,
        ),
      ).toThrow('Unknown currency record type')
    })

    it('throws for insufficient funds', () => {
      expect(() =>
        CurrencyConverter.subtract(
          {
            currency: CurrencyType.Gold,
            value: 100,
          },
          wallet,
        ),
      ).toThrow('Not enough funds in wallet')
    })
  })

  describe('.reshuffleCurrencies', () => {
    it.each([
      [
        { Copper: 9, Silver: 21, Gold: 5.5 },
        { Copper: 9, Silver: 46, Gold: 5 },
      ],
      [
        { Copper: 9, Silver: 21.5, Gold: 5 },
        { Copper: 14, Silver: 21, Gold: 5 },
      ],
      [
        { Copper: 9, Silver: 21.5, Gold: 5.5 },
        { Copper: 14, Silver: 46, Gold: 5 },
      ],
      [
        { Copper: 9.5, Silver: 215, Gold: 55 },
        { Copper: 9.5, Silver: 215, Gold: 55 },
      ],
      [
        { Copper: 96, Silver: 219, Gold: 51 },
        { Copper: 96, Silver: 219, Gold: 51 },
      ],
    ])('should rearrange currencies %j', (input, expected) => {
      const result = CurrencyConverter.reshuffleCurrencies(input)
      expect(result).toEqual(expected as CurrencyWallet)
      expect(
        CurrencyConverter.getWalletValue(result, CurrencyType.Copper),
      ).toEqual(CurrencyConverter.getWalletValue(expected, CurrencyType.Copper))
    })
  })
})
