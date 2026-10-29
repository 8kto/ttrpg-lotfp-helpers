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

export const RifledCostCoeff = 2 as const

export const FiringMechanismLabels: Record<FiringMechanism, string> = {
  [FiringMechanism.Matchlock]: /*i18n*/ 'Matchlock',
  [FiringMechanism.Wheellock]: /*i18n*/ 'Wheellock',
  [FiringMechanism.Flintlock]: /*i18n*/ 'Flintlock',
}

/**
 * Matchlocks (and their modifications, wheellocks and flintlocks) suffer
 * double the normal range penalties. Rifling eliminates the increase.
 */
export const getFirearmRangePenalties = (isRifled: boolean) =>
  isRifled ? { long: -4, medium: -2 } : { long: -8, medium: -4 }
