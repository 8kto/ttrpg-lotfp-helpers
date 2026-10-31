import type { UiContextType } from '@/shared/context/uiContext'
import { defaultUiState } from '@/shared/context/uiContext'

type UiState = UiContextType['uiState']

/**
 * The part of the UI state to show in the URL: the default adjustments would
 * only add noise, and they are restored from the defaults on load
 */
const getHashState = (state: UiState): Partial<UiState> => {
  const { terrain, weather, ...hashState } = state
  const { terrain: defaultTerrain, weather: defaultWeather } =
    defaultUiState.uiState

  return {
    ...hashState,
    ...(terrain !== defaultTerrain && { terrain }),
    ...(weather !== defaultWeather && { weather }),
  }
}

export default getHashState
