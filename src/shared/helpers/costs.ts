import { Coin } from '@/domain'

/**
 * Return the number of coins for the default type (silver).
 * TODO use copper for default?
 */
export const normalizeCoins = (coins: number, type: Coin) => {
  switch (type) {
    case Coin.Copper:
      return coins / 10
    case Coin.Silver:
      return coins
    case Coin.Gold:
      return coins * 50
    default:
      throw new Error('Unknown coins type')
  }
}
