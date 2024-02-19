import {
  compressDataForUrl,
  decompressDataFromUrl,
} from '@/shared/helpers/compressDataForUrl'

describe('compressed data utils', () => {
  const loggerError = jest.spyOn(console, 'error').mockImplementation(() => {
    /*do not write in console*/
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return empty string for invalid data during compression', () => {
    const objectWithCircularReference = { myself: {} }
    objectWithCircularReference.myself = objectWithCircularReference

    const compressed = compressDataForUrl(objectWithCircularReference)
    expect(compressed).toBe('')
    expect(loggerError).toHaveBeenCalledWith(
      expect.stringMatching('Error during data compression for URL:'),
      expect.any(Error),
    )
  })

  it('should return null for invalid input during decompression', () => {
    const invalidInput = '{key: value'

    const decompressed = decompressDataFromUrl(invalidInput)
    expect(decompressed).toBeNull()
    expect(loggerError).toHaveBeenCalledWith(
      expect.stringMatching('Error during data compression for URL:'),
      expect.any(Error),
    )
  })

  describe('integration', () => {
    it('should compress and decompress data correctly', () => {
      const data = { key: 'value' }
      const compressed = compressDataForUrl(data)
      expect(compressed).not.toBe('')

      const decompressed = decompressDataFromUrl(compressed)
      expect(decompressed).toEqual(data)
    })

    it('should compress data', () => {
      const data = { another: false, key: 'value', prop: 2 }

      expect(compressDataForUrl(data)).toEqual(
        'N4Ighgdg9gLgFgUwE4gFwDMwBsDOCA0IA1ggJ5ogBu2ArgiIQA5JSNoBMAvkA',
      )
    })
  })
})
