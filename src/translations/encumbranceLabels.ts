import type { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/macro'

import { Encumbrance, EncumbranceUnit } from '@/domain/encumbrance'

export const EncumbranceLabels: Record<Encumbrance, MessageDescriptor> = {
  [Encumbrance.Unencumbered]: msg`Unencumbered`,
  [Encumbrance.Lightly]: msg`Lightly encumbered`,
  [Encumbrance.Heavily]: msg`Heavily encumbered`,
  [Encumbrance.Severely]: msg`Severely encumbered`,
  [Encumbrance.OverEncumbered]: msg`Over encumbered`,
}

export const WeightLabels: Record<EncumbranceUnit, MessageDescriptor> = {
  [EncumbranceUnit.None]: msg`None`,
  [EncumbranceUnit.Regular]: msg`Regular`,
  [EncumbranceUnit.Oversized]: msg`Oversized`,
  [EncumbranceUnit.Heavy]: msg`Heavy`,
  [EncumbranceUnit.Cumbersome]: msg`Cumbersome`,
  [EncumbranceUnit.OversizedX4]: msg`Oversized ×4`,
}

/**
 * Weights available for custom items
 */
export const CustomItemWeights: ReadonlyArray<EncumbranceUnit> = [
  EncumbranceUnit.None,
  EncumbranceUnit.Regular,
  EncumbranceUnit.Heavy,
  EncumbranceUnit.Oversized,
]
