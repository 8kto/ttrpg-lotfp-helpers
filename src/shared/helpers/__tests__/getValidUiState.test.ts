import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'
import getValidUiState from '@/shared/helpers/getValidUiState'

describe('getValidUiState', () => {
  it('keeps valid values', () => {
    const state = {
      activeEquipmentTabId: 4,
      activeTabId: 1,
      terrain: TerrainAdjustment.Forest,
      version: '1.0.0',
      weather: WeatherAdjustment.Storm,
    }

    expect(getValidUiState(state)).toEqual(state)
  })

  it.each([
    ['weather', 'bogus'],
    ['terrain', 'bogus'],
    ['activeTabId', NaN],
    ['activeTabId', 2],
    ['activeTabId', -1],
    ['activeEquipmentTabId', 5],
    ['activeEquipmentTabId', 1.5],
  ])('drops an invalid %s (%s)', (key, value) => {
    expect(getValidUiState({ [key]: value, version: '1.0.0' })).toEqual({
      version: '1.0.0',
    })
  })
})
