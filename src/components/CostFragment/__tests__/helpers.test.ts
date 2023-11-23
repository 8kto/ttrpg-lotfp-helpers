import { getCoins } from '@/components/CostFragment/helpers'

describe('CostFragment helpers', () => {
  describe('getCoins', () => {
    it('correctly calculates coins for whole numbers', () => {
      expect(getCoins(5)).toEqual({ copperPoints: 0, silverPoints: 5 })
    })

    it('correctly calculates coins for decimal numbers', () => {
      expect(getCoins(5.5)).toEqual({ copperPoints: 5, silverPoints: 5 })
      expect(getCoins(3.7)).toEqual({ copperPoints: 7, silverPoints: 3 })
    })

    it('handles zero cost', () => {
      expect(getCoins(0)).toEqual({ copperPoints: 0, silverPoints: 0 })
    })

    it('handles very small costs', () => {
      expect(getCoins(0.01)).toEqual({ copperPoints: 0, silverPoints: 0 })
    })

    it('rounds copper points correctly', () => {
      expect(getCoins(2.999)).toEqual({ copperPoints: 0, silverPoints: 3 })
    })

    it('handles floating point rounding errors', () => {
      expect(getCoins(0.07)).toEqual({ copperPoints: 1, silverPoints: 0 }) // 0.07 rounds to 0.1, which is 1 copper point
      expect(getCoins(0.06)).toEqual({ copperPoints: 1, silverPoints: 0 }) // 0.06 rounds to 0.1
      expect(getCoins(1.999)).toEqual({ copperPoints: 0, silverPoints: 2 }) // 1.999 rounds to 2.0
      expect(getCoins(1.005)).toEqual({ copperPoints: 0, silverPoints: 1 }) // 1.005 rounds to 1.0
      expect(getCoins(1 + Number.EPSILON)).toEqual({
        copperPoints: 0,
        silverPoints: 1,
      })
      expect(getCoins(1.5 + Number.EPSILON)).toEqual({
        copperPoints: 5,
        silverPoints: 1,
      })
    })
  })
})
