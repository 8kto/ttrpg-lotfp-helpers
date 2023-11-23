import {roundTo} from "@/shared/helpers/roundTo"

describe('roundTo', () => {
  it('rounds to nearest integer', () => {
    expect(roundTo(2.3, 0)).toEqual(2)
    expect(roundTo(2.5, 0)).toEqual(3)
  })

  it('rounds to one decimal place', () => {
    expect(roundTo(2.34, 1)).toEqual(2.3)
    expect(roundTo(2.36, 1)).toEqual(2.4)
  })

  it('rounds to two decimal places', () => {
    expect(roundTo(2.345, 2)).toEqual(2.35)
    expect(roundTo(2.344, 2)).toEqual(2.34)
  })

  it('handles rounding of zeros', () => {
    expect(roundTo(2.0, 2)).toEqual(2.0)
    expect(roundTo(0, 2)).toEqual(0.0)
  })

  it('handles floating point error victims', () => {
    expect(roundTo(0.1 + 0.2, 1)).toEqual(0.3)
    expect(roundTo(2 + Number.EPSILON, 2)).toEqual(2)
    expect(roundTo(Number.EPSILON, 2)).toEqual(0.0)
    expect(roundTo(Number.EPSILON, 0)).toEqual(0)
    expect(roundTo(1.005, 2)).toEqual(1.01)
  })
})