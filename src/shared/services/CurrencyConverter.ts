import type { CurrencyBundle } from '@/domain/currency'
import { CurrencyType } from '@/domain/currency'

export default class CurrencyConverter {
  private static convertToCopper(bundle: CurrencyBundle): number {
    const { coin, value } = bundle

    switch (coin) {
      case CurrencyType.Copper:
        return value
      case CurrencyType.Silver:
        return value * 10
      case CurrencyType.Gold:
        return value * 50 * 10
      default:
        throw new Error('Unknown coin type')
    }
  }

  static convertFromTo(
    moneyUnit: CurrencyBundle,
    to: CurrencyType,
  ): CurrencyBundle {
    const cp = this.convertToCopper(moneyUnit)
    let value: number

    switch (to) {
      case CurrencyType.Copper:
        value = cp
        break
      case CurrencyType.Silver:
        value = cp / 10
        break
      case CurrencyType.Gold:
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
