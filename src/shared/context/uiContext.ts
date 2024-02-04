import { createContext } from 'react'

import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'

import { version } from '../../../package.json'

export type UiContextType = {
  uiState: {
    // Tabs: Inventory, Equipment ...
    activeTabId: number
    // Tabs: Armor, Melee, Missiles ...
    activeEquipmentTabId: number
    terrain: TerrainAdjustment
    weather: WeatherAdjustment
    version: string
  }
  updateUiState: (newState: Partial<UiContextType['uiState']>) => void
}

export const defaultUiState: UiContextType = {
  uiState: {
    activeEquipmentTabId: 0,
    activeTabId: 0,
    terrain: TerrainAdjustment.Road,
    version,
    weather: WeatherAdjustment.Regular,
  },
  updateUiState: () => defaultUiState,
}

const UiContext = createContext<UiContextType>(defaultUiState)

export default UiContext
