import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'
import type { UiContextType } from '@/shared/context/uiContext'
import {
  EQUIPMENT_TABS_COUNT,
  INVENTORY_TABS_COUNT,
} from '@/shared/context/uiContext'

type UiState = UiContextType['uiState']

const isTabIndex = (value: unknown, tabsCount: number) =>
  Number.isInteger(value) && Number(value) >= 0 && Number(value) < tabsCount

const validators: Partial<Record<keyof UiState, (v: unknown) => boolean>> = {
  activeEquipmentTabId: (value) => isTabIndex(value, EQUIPMENT_TABS_COUNT),
  activeTabId: (value) => isTabIndex(value, INVENTORY_TABS_COUNT),
  terrain: (value) => value === TerrainAdjustment[value as TerrainAdjustment],
  weather: (value) => value === WeatherAdjustment[value as WeatherAdjustment],
}

/**
 * The hash can be edited by hand or come from an older version:
 * drop the values the UI cannot render, so the defaults apply
 */
const getValidUiState = (state: Partial<UiState>): Partial<UiState> => {
  const entries = Object.entries(state).filter(
    ([key, value]) => validators[key as keyof UiState]?.(value) ?? true,
  )

  return Object.fromEntries(entries)
}

export default getValidUiState
