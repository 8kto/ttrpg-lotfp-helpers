import {
  autoincrement,
  getAutoIncrementedId,
} from '@/shared/helpers/autoincrement'

describe('autoincrement util', () => {
  describe('autoincrement', () => {
    it('should yield an incrementing sequence of numbers starting from 1', () => {
      const generator = autoincrement()

      expect(generator.next().value).toBe(1)
      expect(generator.next().value).toBe(2)
      expect(generator.next().value).toBe(3)
    })

    it('should continue incrementing on subsequent calls', () => {
      const generator = autoincrement()

      for (let i = 1; i <= 5; i++) {
        expect(generator.next().value).toBe(i)
      }

      // Continue from where it left off
      expect(generator.next().value).toBe(6)
      expect(generator.next().value).toBe(7)
    })

    it('should yield an incrementing sequence when used in a for-of loop', () => {
      const generator = autoincrement()
      let count = 0
      let lastValue

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (const value of generator) {
        lastValue = value
        count += 1

        expect(value).toEqual(count)

        // Exit after 5 iterations to avoid infinite loop
        if (count === 5) {
          break
        }
      }

      expect(count).toBe(5)
      expect(lastValue).toBe(5)
    })
  })

  describe('getAutoIncrementedId', () => {
    it('should return incrementing numbers on consecutive calls', () => {
      expect(getAutoIncrementedId()).toBe(1)
      expect(getAutoIncrementedId()).toBe(2)
      expect(getAutoIncrementedId()).toBe(3)
    })
  })
})
