import type { CurrencyBundle, CurrencyWallet } from '@/domain/currency'
import { CurrencyType, Unit } from '@/domain/currency'

export default class CurrencyConverter {
  static CURRENCY_TYPE_WALLET: Record<CurrencyType, keyof CurrencyWallet> = {
    [CurrencyType.Copper]: 'copper',
    [CurrencyType.Silver]: 'silver',
    [CurrencyType.Gold]: 'gold',
  }

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
        throw new Error('Unknown currency type')
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
        throw new Error('Unknown currency type')
    }

    return {
      coin: to,
      value,
    }
  }

  private static getWalletKey(currency: CurrencyType): keyof CurrencyWallet {
    if (!this.CURRENCY_TYPE_WALLET[currency]) {
      throw new Error('Unknown currency type')
    }

    return this.CURRENCY_TYPE_WALLET[currency]
  }

  /**
   * Convert any cost onto the default one for displaying in UI
   */
  static getDisplayCost(bundle: CurrencyBundle) {
    return this.convertFromTo(bundle, CurrencyType.Silver)
  }

  static isValidWallet(wallet: CurrencyWallet): boolean {
    return Object.values(wallet).every((v) => v >= 0)
  }

  static isWalletEmpty(wallet: CurrencyWallet): boolean {
    return Object.values(wallet).every((v) => !v)
  }

  static getDisplayCostFromWallet(wallet: CurrencyWallet) {
    if (!this.isValidWallet(wallet)) {
      throw new Error(`Invalid values in wallet ${JSON.stringify(wallet)}`)
    }

    const values = [
      [wallet.gold, Unit.Gold],
      [wallet.silver, Unit.Silver],
      [wallet.copper, Unit.Copper],
    ]
      .filter((v) => !!v[0])
      .map(([value, suffix]) => {
        return `${value}${suffix}`
      })
      .join(', ')

    return values
  }

  static add(bundle: CurrencyBundle, wallet: CurrencyWallet): CurrencyWallet {
    const { coin, value } = bundle
    const newWallet = { ...wallet }

    newWallet[this.getWalletKey(coin)] += value

    return newWallet
  }

  static createWalletFrom(bundle: CurrencyBundle): CurrencyWallet {
    const { coin, value } = bundle

    const newWallet: CurrencyWallet = {
      copper: 0,
      gold: 0,
      silver: 0,
      [this.getWalletKey(coin)]: value,
    }

    return newWallet
  }
}
