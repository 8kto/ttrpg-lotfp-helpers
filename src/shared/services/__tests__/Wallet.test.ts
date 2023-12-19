import { Coin } from '@/domain/cost'
import Wallet from '@/shared/services/Wallet'

describe('Wallet', () => {
  describe('convertFromTo', () => {
    // Define test cases for each permutation
    const testCases = [
      { expected: 1, from: Coin.Gold, to: Coin.Gold, value: 1 },
      { expected: 50, from: Coin.Gold, to: Coin.Silver, value: 1 },
      { expected: 500, from: Coin.Gold, to: Coin.Copper, value: 1 },
      { expected: 1, from: Coin.Silver, to: Coin.Gold, value: 50 },
      { expected: 1, from: Coin.Silver, to: Coin.Silver, value: 1 },
      { expected: 10, from: Coin.Silver, to: Coin.Copper, value: 1 },
      { expected: 1, from: Coin.Copper, to: Coin.Gold, value: 500 },
      { expected: 1, from: Coin.Copper, to: Coin.Silver, value: 10 },
      { expected: 1, from: Coin.Copper, to: Coin.Copper, value: 1 },
    ]

    testCases.forEach(({ expected, from, to, value }) => {
      it(`should correctly convert ${value} ${from} to ${expected} ${to}`, () => {
        const result = Wallet.convertFromTo({ coin: from, value }, to)
        expect(result).toStrictEqual({
          coin: to,
          value: expected,
        })
      })
    })
  })
})
