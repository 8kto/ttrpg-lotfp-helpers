import type { MoneyUnit } from '@/domain/cost'
import { Coin } from '@/domain/cost'

export default class Wallet {
  private static convertToCopper(moneyUnit: MoneyUnit): number {
    const { coin, value } = moneyUnit

    switch (coin) {
      case Coin.Copper:
        return value
      case Coin.Silver:
        return value * 10
      case Coin.Gold:
        return value * 50 * 10
      default:
        throw new Error('Unknown coin type')
    }
  }

  static convertFromTo(moneyUnit: MoneyUnit, to: Coin): MoneyUnit {
    const cp = this.convertToCopper(moneyUnit)
    let value: number

    switch (to) {
      case Coin.Copper:
        value = cp
        break
      case Coin.Silver:
        value = cp / 10
        break
      case Coin.Gold:
        value = cp / 10 / 50
        break
      default:
        throw new Error('Unknown coin type')
    }

    return {
      coin: to,
      value,
    }
  }
}
