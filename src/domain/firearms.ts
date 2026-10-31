export enum FiringMechanism {
  Matchlock = 'Matchlock',
  Wheellock = 'Wheellock',
  Flintlock = 'Flintlock',
}

export enum YearPeriod {
  '1610-1630' = '1610-1630',
  '1631-1660' = '1631-1660',
  '> 1661' = '> 1661',
}

type PeriodCoefficients = {
  [period in YearPeriod]?: number
} & {
  default: number
}

export type CoeffYearType = {
  [key in FiringMechanism]: PeriodCoefficients
}
