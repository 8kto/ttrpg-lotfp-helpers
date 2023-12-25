/* istanbul ignore file */
// NB! Stop ignoring if the file contains logic
import type { MovementDict } from '@/domain/encumbrance'
import { Encumbrance, Movement } from '@/domain/encumbrance'
import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'

export const MovementRates: Readonly<Record<Encumbrance, MovementDict>> = {
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

export const Adjustments: Record<
  TerrainAdjustment | WeatherAdjustment,
  number
> = {
  [TerrainAdjustment.None]: 1,
  [TerrainAdjustment.Road]: 1,
  [TerrainAdjustment.Trail]: 2 / 3, // clear, plains, trail
  [TerrainAdjustment.Forest]: 1 / 2, // forest, desert, hills
  [TerrainAdjustment.Mountains]: 1 / 3, // mountains, jungle, swamp
  [WeatherAdjustment.Regular]: 1,
  [WeatherAdjustment.Precipitations]: 1 / 2, // precipitations, high winds
  [WeatherAdjustment.Storm]: 1 / 3,
}
