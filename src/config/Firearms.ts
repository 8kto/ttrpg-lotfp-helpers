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

// \/*i18n*\/ marks the values for `lingui extract`; translate them with i18n._()
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

/**
 * Short explanations of what each firing mechanism is, for tooltips.
 * The rules themselves are on the firearms reference page.
 * The \/*i18n*\/ markers register the messages for `lingui extract`.
 */
export const FiringMechanismHints: Record<FiringMechanism, string> = {
  [FiringMechanism.Matchlock]: /*i18n*/ 'firearms.hint.matchlock',
  [FiringMechanism.Wheellock]: /*i18n*/ 'firearms.hint.wheellock',
  [FiringMechanism.Flintlock]: /*i18n*/ 'firearms.hint.flintlock',
}

export const RifledHint = /*i18n*/ 'firearms.hint.rifled'

/**
 * Misfire chances in 10. Damp conditions (most dungeons) double the chance,
 * wet conditions (rain) quadruple it. Wheellocks ignore the conditions.
 */
export const getMisfireChances = (mechanism: FiringMechanism) => {
  const dry = mechanism === FiringMechanism.Flintlock ? 1 : 2

  if (mechanism === FiringMechanism.Wheellock) {
    return { damp: dry, dry, wet: dry }
  }

  return { damp: dry * 2, dry, wet: dry * 4 }
}
