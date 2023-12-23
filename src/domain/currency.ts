export enum CurrencyType {
  Silver = 'Silver',
  Copper = 'Copper',
  Gold = 'Gold',
}

export enum Unit {
  Copper = 'cp',
  Silver = 'sp',
  Gold = 'gp',
}

export type CurrencyWallet = {
  Copper: number
  Silver: number
  Gold: number
}

export type CurrencyRecord = {
  value: number
  currency: CurrencyType
}
