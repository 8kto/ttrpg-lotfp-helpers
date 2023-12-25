import { t } from '@lingui/macro'

import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'

const getAdjustmentLabels = (): Record<
  TerrainAdjustment | WeatherAdjustment,
  string
> => ({
  [TerrainAdjustment.None]: t`None`,
  [TerrainAdjustment.Road]: t`Road`,
  [TerrainAdjustment.Trail]: t`Clear, plains, trail`,
  [TerrainAdjustment.Forest]: t`Forest, desert, hills`,
  [TerrainAdjustment.Mountains]: t`Mountains, jungle, swamp`,
  [WeatherAdjustment.Regular]: t`Regular weather`,
  [WeatherAdjustment.Precipitations]: t`Precipitations, high winds`,
  [WeatherAdjustment.Storm]: t`Storm conditions`,
})

export const getMovementAdjustments = (type: 'terrain' | 'weather') => {
  const keys =
    type === 'terrain'
      ? Object.keys(TerrainAdjustment)
      : Object.keys(WeatherAdjustment)

  return Object.entries(getAdjustmentLabels())
    .filter(([key]) => {
      return keys.includes(key)
    })
    .map(([, title]) => title)
}
