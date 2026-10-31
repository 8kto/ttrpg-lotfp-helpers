import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'
import getValidUiState from '@/shared/helpers/getValidUiState'

describe('getValidUiState', () => {
  it('keeps valid values', () => {
    const state = {
      activeEquipmentTabId: 4,
      activeTabId: 1,
      terrain: TerrainAdjustment.Forest,
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
    expect(getValidUiState({ activeTabId: 1, [key]: value })).toEqual(
      key === 'activeTabId' ? {} : { activeTabId: 1 },
    )
  })
})
