import type { MovementTuple } from '@/shared/types/encumbrance'
import { Encumbrance, Movement } from '@/shared/types/encumbrance'

export const MovementRates: Record<Encumbrance, MovementTuple> = {
  [Encumbrance.Unencumbered]: {
    [Movement.Exploration]: 120,
    [Movement.Combat]: 40,
    [Movement.Running]: 120,
    [Movement.MilesPerDay]: 24,
  },
  [Encumbrance.Lightly]: {
    [Movement.Exploration]: 90,
    [Movement.Combat]: 30,
    [Movement.Running]: 90,
    [Movement.MilesPerDay]: 18,
  },
  [Encumbrance.Heavily]: {
    [Movement.Exploration]: 60,
    [Movement.Combat]: 20,
    [Movement.Running]: 60,
    [Movement.MilesPerDay]: 12,
  },
  [Encumbrance.Severely]: {
    [Movement.Exploration]: 30,
    [Movement.Combat]: 10,
    [Movement.Running]: 30,
    [Movement.MilesPerDay]: 6,
  },
  [Encumbrance.OverEncumbered]: {
    [Movement.Exploration]: 0,
    [Movement.Combat]: 0,
    [Movement.Running]: 0,
    [Movement.MilesPerDay]: 0,
  },
}
