import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'
import { modifyMovement } from '@/shared/helpers/movement'

describe('movement helpers', () => {
  describe('modifyMovement', () => {
    it.each([
      {
        expected: 10,
        movement: 10,
        terrain: TerrainAdjustment.Road,
        weather: WeatherAdjustment.Regular,
      },
      {
        expected: 6.67,
        movement: 10,
        terrain: TerrainAdjustment.Trail,
        weather: WeatherAdjustment.Regular,
      },
      {
        expected: 2.5,
        movement: 10,
        terrain: TerrainAdjustment.Forest,
        weather: WeatherAdjustment.Precipitations,
      },
      {
        expected: 1.11,
        movement: 10,
        terrain: TerrainAdjustment.Mountains,
        weather: WeatherAdjustment.Storm,
      },
    ])(
      'correctly modifies movement for terrain $terrain and weather $weather',
      ({ expected, movement, terrain, weather }) => {
        expect(modifyMovement({ movement, terrain, weather })).toBeCloseTo(
          expected,
          2,
        )
      },
    )

    it('throws an error for invalid weather adjustment', () => {
      expect(() =>
        modifyMovement({
          movement: 10,
          terrain: TerrainAdjustment.Road,
          weather: 'InvalidWeather' as WeatherAdjustment,
        }),
      ).toThrow('Invalid weather adjustment')
    })

    it('throws an error for invalid terrain adjustment', () => {
      expect(() =>
        modifyMovement({
          movement: 10,
          terrain: 'InvalidTerrain' as TerrainAdjustment,
          weather: WeatherAdjustment.Regular,
        }),
      ).toThrow('Invalid terrain adjustment')
    })
  })
})
