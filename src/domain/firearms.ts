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

type CoeffYearType = {
  [key in FiringMechanism]: PeriodCoefficients
}

export const FirearmCostCoeff: CoeffYearType = {
  [FiringMechanism.Flintlock]: {
    [YearPeriod['1610-1630']]: 2,
    [YearPeriod['1631-1660']]: 1.5,
    [YearPeriod['> 1661']]: 1,
    default: 2,
  },
  [FiringMechanism.Matchlock]: {
    default: 1,
  },
  [FiringMechanism.Wheellock]: {
    default: 7,
  },
}

export const RiffledCostCoeff = 2 as const
