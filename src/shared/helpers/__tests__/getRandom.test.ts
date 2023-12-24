import { getRandom } from '@/shared/helpers/getRandom'

// That is going to be funny
describe('getRandom function', () => {
  it.each([
    [1, 10],
    [0, 1],
    [11, 12],
    [100, 1000],
    [-10, 0],
    [-10, 10],
    [1, 1],
    [0, 0],
  ])('should return a number between %d and %d', (min, max) => {
    const result = getRandom(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })

  it('should throw an error if the minimum value is greater than the maximum value', () => {
    const min = 10
    const max = 1
    expect(() => {
      getRandom(min, max)
    }).toThrow('Minimum value should not be greater than maximum value.')
  })
})
