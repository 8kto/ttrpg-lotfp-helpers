export enum Coin {
  Silver = 'Silver',
  Copper = 'Copper',
  Gold = 'Gold',
}

export enum Unit {
  Copper = 'cp',
  Silver = 'sp',
  Gold = 'gp',
}

export type Wallet = {
  copper: number
  silver: number
  gold: number
}

export type MoneyUnit = {
  value: number
  coin: Coin
}
