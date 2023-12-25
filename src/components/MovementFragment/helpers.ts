import { t } from '@lingui/macro'

import { Adjustments } from '@/config/MovementRates'
import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'

const getAdjustmentLabels = (): Record<
  TerrainAdjustment | WeatherAdjustment,
  string
> => ({
  [TerrainAdjustment.Road]: t`Road`,
  [TerrainAdjustment.Trail]: t`Clear, plains, trail`,
  [TerrainAdjustment.Forest]: t`Forest, desert, hills`,
  [TerrainAdjustment.Mountains]: t`Mountains, jungle, swamp`,
  [WeatherAdjustment.Regular]: t`Regular weather`,
  [WeatherAdjustment.Precipitations]: t`Precipitations, high winds`,
  [WeatherAdjustment.Storm]: t`Storm conditions`,
})

export const getMovementAdjustments = (type: 'terrain' | 'weather') => {
  let keys = Array<string>()
  if (type === 'terrain') {
    keys = Object.keys(TerrainAdjustment)
  } else if (type === 'weather') {
    keys = Object.keys(WeatherAdjustment)
  }

  if (!keys.length) {
    throw new Error('Unknown adjustments type')
  }

  return Object.entries(getAdjustmentLabels()).filter(([key]) =>
    keys.includes(key),
  )
}

export const modifyMovement = ({
  movement,
  terrain,
  weather,
}: {
  weather: WeatherAdjustment
  terrain: TerrainAdjustment
  movement: number
}): number => {
  const modW = Adjustments[weather]
  const modT = Adjustments[terrain]

  return movement * modW * modT
}
