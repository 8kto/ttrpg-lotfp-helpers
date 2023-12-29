import deepclone from '@/shared/helpers/deepclone'
import getStateFromSearchString from '@/shared/helpers/getStateFromSearchString'

describe('getStateFromSearchString', () => {
  const sampleStorage = {
    booleanField: false,
    numberField: 1,
    stringField: 'test',
  }
  const clone = deepclone(sampleStorage)

  it('parses number from search string correctly', () => {
    const searchString = '?numberField=10'
    const result = getStateFromSearchString(searchString, sampleStorage)
    expect(result).toEqual({ numberField: 10 })
    expect(sampleStorage).toEqual(clone)
  })

  it('parses boolean from search string correctly', () => {
    const searchString = '?booleanField=true'
    const result = getStateFromSearchString(searchString, sampleStorage)
    expect(result).toEqual({ booleanField: true })
    expect(sampleStorage).toEqual(clone)
  })

  it('parses string from search string correctly', () => {
    const searchString = '?stringField=hello'
    const result = getStateFromSearchString(searchString, sampleStorage)
    expect(result).toEqual({ stringField: 'hello' })
    expect(sampleStorage).toEqual(clone)
  })

  it('ignores fields not in storage', () => {
    const searchString = '?extraField=extra'
    const result = getStateFromSearchString(searchString, sampleStorage)
    expect(result).toEqual({})
    expect(sampleStorage).toEqual(clone)
  })

  it('handles empty search string', () => {
    const searchString = ''
    const result = getStateFromSearchString(searchString, sampleStorage)
    expect(result).toEqual({})
    expect(sampleStorage).toEqual(clone)
  })

  it('handles multiple fields in search string', () => {
    const searchString = '?numberField=5&booleanField=true&stringField=world'
    const result = getStateFromSearchString(searchString, sampleStorage)
    expect(result).toEqual({
      booleanField: true,
      numberField: 5,
      stringField: 'world',
    })
    expect(sampleStorage).toEqual(clone)
  })

  it('converts to correct types even with mixed types in search string', () => {
    const searchString =
      '?numberField=abc&booleanField=notBoolean&stringField=123'
    const result = getStateFromSearchString(searchString, sampleStorage)
    expect(result).toEqual({
      // 'abc' cannot be converted to a number
      booleanField: false,
      numberField: NaN, // 'notBoolean' is not 'true', so it defaults to false
      stringField: '123',
    })
  })
})
