import { createContext } from 'react'

import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'

export type UiContextType = {
  uiState: {
    activeTabId: number
    terrain: TerrainAdjustment
    weather: WeatherAdjustment
  }
  updateUiState: (newState: UiContextType['uiState']) => void
}

export const defaultUiState: UiContextType = {
  uiState: {
    activeTabId: 0,
    terrain: TerrainAdjustment.Road,
    weather: WeatherAdjustment.Regular,
  },
  updateUiState: () => defaultUiState,
}

const UiContext = createContext<UiContextType>(defaultUiState)

export default UiContext
