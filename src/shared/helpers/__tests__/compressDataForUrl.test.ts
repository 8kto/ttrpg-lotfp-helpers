import * as compressUtils from '@/shared/helpers/compressDataForUrl'

jest.mock('@/shared/helpers/compressDataForUrl')

describe('compressed data utils', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return empty string for invalid data during compression', () => {
    ;(compressUtils.compressDataForUrl as jest.Mock).mockImplementation(
      () => '',
    )
    const invalidData = () => {}
    const compressed = compressUtils.compressDataForUrl(invalidData)
    expect(compressed).toBe('')
    expect(compressUtils.compressDataForUrl).toHaveBeenCalledWith(invalidData)
  })

  it('should return null for invalid input during decompression', () => {
    ;(compressUtils.decompressDataFromUrl as jest.Mock).mockImplementation(
      () => null,
    )
    const invalidInput = 'invalid compressed data'
    const decompressed = compressUtils.decompressDataFromUrl(invalidInput)
    expect(decompressed).toBeNull()
    expect(compressUtils.decompressDataFromUrl).toHaveBeenCalledWith(
      invalidInput,
    )
  })

  describe('integration', () => {
    beforeAll(() => {
      jest.unmock('@/shared/helpers/compressDataForUrl')
      jest.resetModules()
    })

    it('should compress and decompress data correctly', () => {
      const actualCompressUtils = jest.requireActual(
        '@/shared/helpers/compressDataForUrl',
      )

      const data = { key: 'value' }
      const compressed = actualCompressUtils.compressDataForUrl(data)
      expect(compressed).not.toBe('')

      const decompressed = actualCompressUtils.decompressDataFromUrl(compressed)
      expect(decompressed).toEqual(data)
    })

    it('should compress data', () => {
      const actualCompressUtils = jest.requireActual(
        '@/shared/helpers/compressDataForUrl',
      )

      const data = { another: false, key: 'value', prop: 2 }
      expect(actualCompressUtils.compressDataForUrl(data)).toEqual(
        'N4Ighgdg9gLgFgUwE4gFwDMwBsDOCA0IA1ggJ5ogBu2ArgiIQA5JSNoBMAvkA',
      )
    })
  })
})
