import type { CurrencyRecord, CurrencyWallet } from '@/domain/currency'
import { CurrencyType, Unit } from '@/domain/currency'

export default class CurrencyConverter {
  private static convertToCopper(record: CurrencyRecord): number {
    const { currency, value } = record

    switch (currency) {
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
    moneyUnit: CurrencyRecord,
    to: CurrencyType,
  ): CurrencyRecord {
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
      currency: to,
      value,
    }
  }

  private static validateWalletKey(currency: CurrencyType): void | never {
    if (!CurrencyType[currency]) {
      throw new Error('Unknown currency type')
    }
  }

  /**
   * Convert any cost onto the default one for displaying in UI
   */
  static getDisplayCost(record: CurrencyRecord) {
    return this.convertFromTo(record, CurrencyType.Silver)
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
      [wallet.Gold, Unit.Gold],
      [wallet.Silver, Unit.Silver],
      [wallet.Copper, Unit.Copper],
    ]
      .filter((v) => !!v[0])
      .map(([value, suffix]) => {
        return `${value}${suffix}`
      })
      .join(', ')

    return values
  }

  static add(record: CurrencyRecord, wallet: CurrencyWallet): CurrencyWallet {
    const { currency, value } = record
    const newWallet = { ...wallet }
    this.validateWalletKey(currency)

    newWallet[currency] += value

    return newWallet
  }

  static createWalletFrom(record: CurrencyRecord): CurrencyWallet {
    const { currency, value } = record
    this.validateWalletKey(currency)

    const newWallet: CurrencyWallet = {
      Copper: 0,
      Gold: 0,
      Silver: 0,
      [currency]: value,
    }

    return newWallet
  }
}
