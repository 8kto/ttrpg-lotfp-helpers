import type { CurrencyRecord, CurrencyWallet } from '@/domain/currency'
import { CurrencyType, Unit } from '@/domain/currency'

const COPPER_PER_GOLD = 500 // 50 * 10
const COPPER_PER_SILVER = 10
const DEFAULT_CURRENCY = CurrencyType.Silver

export default class CurrencyConverter {
  private static convertToCopper(record: CurrencyRecord): number {
    const { currency, value } = record

    switch (currency) {
      case CurrencyType.Copper:
        return value
      case CurrencyType.Silver:
        return value * COPPER_PER_SILVER
      case CurrencyType.Gold:
        return value * COPPER_PER_GOLD
      default:
        throw new Error('Unknown currency type')
    }
  }

  static convertFromTo(
    currencyRecord: CurrencyRecord,
    to: CurrencyType,
  ): CurrencyRecord {
    const cp = this.convertToCopper(currencyRecord)
    let value: number

    switch (to) {
      case CurrencyType.Copper:
        value = cp
        break
      case CurrencyType.Silver:
        value = cp / COPPER_PER_SILVER
        break
      case CurrencyType.Gold:
        value = cp / COPPER_PER_GOLD
        break
      default:
        throw new Error('Unknown currency type')
    }

    return {
      currency: to,
      value,
    }
  }

  private static validateCurrencyRecord(
    currencyRecord: CurrencyRecord,
  ): void | never {
    if (!CurrencyType[currencyRecord.currency]) {
      throw new Error('Unknown currency record type')
    }
    if (
      typeof currencyRecord.value === 'undefined' ||
      isNaN(Number(currencyRecord.value))
    ) {
      throw new Error('Invalid currency record value')
    }
  }

  private static validateWallet(wallet: CurrencyWallet): void | never {
    if (!this.isValidWallet(wallet)) {
      throw new Error(`Invalid wallet ${JSON.stringify(wallet)}`)
    }
  }

  /**
   * Convert any cost onto the default one for displaying in UI
   */
  static getDisplayCost(record: CurrencyRecord) {
    return this.convertFromTo(record, DEFAULT_CURRENCY)
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
    this.validateWallet(wallet)

    const values = [
      [wallet.Gold, Unit.Gold],
      [wallet.Silver, Unit.Silver],
      [wallet.Copper, Unit.Copper],
    ].filter(([value]) => !!value)

    return values as Array<[number, Unit]>
  }

  static getWalletValue(
    wallet: CurrencyWallet,
    currency: CurrencyType,
  ): CurrencyRecord {
    this.validateWallet(wallet)

    const valueCp = Object.entries(wallet).reduce(
      (acc, [currencyType, value]) => {
        switch (currencyType) {
          case CurrencyType.Copper:
            return acc + value
          case CurrencyType.Silver:
            return acc + value * COPPER_PER_SILVER
          case CurrencyType.Gold:
            return acc + value * COPPER_PER_GOLD
          default:
            throw new Error('Unknown currency type')
        }
      },
      0,
    )

    return this.convertFromTo(
      {
        currency: CurrencyType.Copper,
        value: valueCp,
      },
      currency,
    )
  }

  static hasEnoughFundsInWallet(
    record: CurrencyRecord,
    wallet: CurrencyWallet,
  ): boolean {
    this.validateWallet(wallet)
    this.validateCurrencyRecord(record)

    const cp = this.convertToCopper(record)
    const walletValue = this.getWalletValue(wallet, CurrencyType.Copper)

    return walletValue.value >= cp
  }

  static add(record: CurrencyRecord, wallet: CurrencyWallet): CurrencyWallet {
    this.validateWallet(wallet)
    this.validateCurrencyRecord(record)

    const { currency, value } = record
    const newWallet = { ...wallet }

    newWallet[currency] += value

    return newWallet
  }

  static subtract(
    record: CurrencyRecord,
    wallet: CurrencyWallet,
  ): CurrencyWallet {
    this.validateWallet(wallet)
    this.validateCurrencyRecord(record)

    const { currency, value } = record
    const newWallet = { ...wallet }

    newWallet[currency] -= value

    return newWallet
  }

  static createWalletFrom(record: CurrencyRecord): CurrencyWallet {
    const { currency, value } = record
    this.validateCurrencyRecord(record)

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
    this.validateWallet(wallet)
    this.validateWallet(newWallet)

    return Object.keys(wallet).reduce(
      (acc, key) => {
        const walletKey = key as keyof CurrencyWallet
        acc[walletKey] = acc[walletKey] + wallet[walletKey]

        return acc
      },
      { ...newWallet },
    )
  }

  static getNormalized(wallet: CurrencyWallet): CurrencyWallet {
    this.validateWallet(wallet)

    // Convert everything to copper
    const totalCopper =
      wallet.Copper +
      wallet.Silver * COPPER_PER_SILVER +
      wallet.Gold * COPPER_PER_GOLD

    const gold = Math.floor(totalCopper / COPPER_PER_GOLD)
    const remainingCopperAfterGold = totalCopper % COPPER_PER_GOLD

    const silver = Math.floor(remainingCopperAfterGold / COPPER_PER_SILVER)
    const copper = remainingCopperAfterGold % COPPER_PER_SILVER

    return {
      Copper: copper,
      Gold: gold,
      Silver: silver,
    }
  }

  static convertCopperToDefaultCurrency(cp: number): CurrencyRecord {
    return {
      currency: CurrencyType.Silver,
      value: cp / COPPER_PER_SILVER,
    }
  }
}
