import { createContext } from 'react'

import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'

export type UiContextType = {
  uiState: {
    // Tabs: Inventory, Equipment ...
    activeTabId: number
    terrain: TerrainAdjustment
    weather: WeatherAdjustment
  }
  updateUiState: (newState: Partial<UiContextType['uiState']>) => void
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
