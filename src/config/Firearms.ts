import type { CoeffYearType } from '@/domain/firearms'
import { FiringMechanism, YearPeriod } from '@/domain/firearms'

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
