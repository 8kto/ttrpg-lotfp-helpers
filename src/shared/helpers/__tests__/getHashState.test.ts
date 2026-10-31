import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'
import { defaultUiState } from '@/shared/context/uiContext'
import getHashState from '@/shared/helpers/getHashState'

describe('getHashState', () => {
  it('omits the default terrain and weather', () => {
    expect(getHashState(defaultUiState.uiState)).toEqual({
      activeEquipmentTabId: 0,
      activeTabId: 0,
    })
  })

  it('keeps the changed terrain and weather', () => {
    const state = {
      ...defaultUiState.uiState,
      terrain: TerrainAdjustment.Forest,
      weather: WeatherAdjustment.Storm,
    }

    expect(getHashState(state)).toEqual(state)
  })
})
