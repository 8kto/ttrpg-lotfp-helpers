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
  copper: number
  silver: number
  gold: number
}

export type CurrencyBundle = {
  value: number
  coin: CurrencyType
}
