import { Adjustments } from '@/config/MovementRates'
import type { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'

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

  if (!modW) {
    throw new Error('Invalid weather adjustment')
  }
  if (!modT) {
    throw new Error('Invalid terrain adjustment')
  }

  return movement * modW * modT
}
