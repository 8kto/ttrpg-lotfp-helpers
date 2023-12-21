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

  static isValidWallet(wallet: CurrencyWallet): boolean | void {
    const entries = Object.entries(wallet)

    return (
      entries.length === 3 &&
      entries.every(([key, value]) => {
        return CurrencyType[key as CurrencyType] && !isNaN(value) && value >= 0
      })
    )
  }

  static isWalletEmpty(wallet: CurrencyWallet): boolean {
    return Object.values(wallet).every((v) => !v)
  }

  static getDisplayCostFromWallet(
    wallet: CurrencyWallet,
  ): Array<[number, Unit]> {
    if (!this.isValidWallet(wallet)) {
      throw new Error(`Invalid values in wallet ${JSON.stringify(wallet)}`)
    }

    const values = [
      [wallet.Gold, Unit.Gold],
      [wallet.Silver, Unit.Silver],
      [wallet.Copper, Unit.Copper],
    ].filter(([value]) => !!value)

    return values as Array<[number, Unit]>
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

    return {
      Copper: 0,
      Gold: 0,
      Silver: 0,
      [currency]: value,
    }
  }

  static mergeWallets(
    newWallet: CurrencyWallet,
    wallet: CurrencyWallet,
  ): CurrencyWallet {
    if (!this.isValidWallet(wallet)) {
      throw new Error(`Invalid values in wallet ${JSON.stringify(wallet)}`)
    }
    if (!this.isValidWallet(newWallet)) {
      throw new Error(`Invalid values in wallet ${JSON.stringify(newWallet)}`)
    }

    return Object.keys(wallet).reduce(
      (acc, key) => {
        const walletKey = key as keyof CurrencyWallet
        acc[walletKey] = acc[walletKey] + wallet[walletKey]

        return acc
      },
      { ...newWallet },
    )
  }
}
