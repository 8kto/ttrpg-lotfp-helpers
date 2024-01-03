import type { NextRouter } from 'next/router'

import * as decompressUtils from '@/shared/helpers/compressDataForUrl'
import { compressDataForUrl } from '@/shared/helpers/compressDataForUrl'
import {
  getImportUrlParameter,
  getShareableUrl,
  getStateFromJson,
  resetUrlParams,
  setStateFromTheCompressedUrlData,
} from '@/shared/helpers/shareableUrl'
import { stateMock } from '@/shared/mocks/stateMock'
import * as inventoryState from '@/state/InventoryState'

jest.mock('@/shared/helpers/compressDataForUrl', () => ({
  compressDataForUrl: jest.fn(),
  decompressDataFromUrl: jest.fn(),
}))

jest.mock('@/state/InventoryState', () => ({
  setState: jest.fn(),
}))

describe('shareable URL helpers', () => {
  let windowSpy: jest.SpyInstance

  beforeEach(() => {
    windowSpy = jest.spyOn(globalThis, 'window', 'get')
  })

  afterEach(() => {
    jest.clearAllMocks()
    windowSpy.mockRestore()
  })

  describe('getImportUrlParameter', () => {
    it('should return null when there is no import parameter', () => {
      Object.defineProperty(globalThis, 'window', {
        value: { location: { href: 'https://example.com/en', search: '' } },
        writable: true,
      })

      expect(getImportUrlParameter()).toBeNull()
    })

    it('should return the import parameter value when it exists', () => {
      const importValue = 'testValue'

      Object.defineProperty(globalThis, 'window', {
        value: {
          location: {
            href: 'https://example.com/en',
            search: `?import=${importValue}`,
          },
        },
        writable: true,
      })

      expect(getImportUrlParameter()).toBe(importValue)
    })

    it('should return null when window is undefined', () => {
      windowSpy.mockImplementation(() => undefined)
      expect(getImportUrlParameter()).toBeNull()
    })
  })

  describe('setStateFromTheCompressedUrlData', () => {
    it('should call setState with decompressed state when input is valid', () => {
      const mockInput = 'validCompressedData'
      const mockState = { items: ['item1', 'item2'] }

      ;(decompressUtils.decompressDataFromUrl as jest.Mock).mockReturnValue(
        mockState,
      )
      setStateFromTheCompressedUrlData(mockInput)

      expect(inventoryState.setState).toHaveBeenCalledWith(mockState)
    })

    it('should not call setState when input is invalid', () => {
      ;(decompressUtils.decompressDataFromUrl as jest.Mock).mockReturnValue(
        null,
      )
      setStateFromTheCompressedUrlData('invalidData')
      expect(inventoryState.setState).not.toHaveBeenCalled()
    })
  })

  describe('resetUrlParams', () => {
    it('should reset URL', () => {
      const originalURL = window.URL
      const locationReplaceMock = jest.fn()

      Object.defineProperty(globalThis, 'window', {
        value: {
          URL: jest.fn().mockImplementation((href) => {
            return {
              href,
              origin: 'http://example.com',
              pathname: '/path',
            }
          }),
          location: {
            href: 'http://example.com/path?param=1#hash-var',
            replace: locationReplaceMock,
            search: '',
          },
        },
        writable: true,
      })

      resetUrlParams()

      expect(globalThis.window.URL).toHaveBeenCalledWith(
        'http://example.com/path?param=1#hash-var',
      )
      expect(locationReplaceMock).toHaveBeenCalledWith(
        'http://example.com/path',
      )

      window.URL = originalURL
    })
  })

  describe('getShareableUrl', () => {
    it('should generate a shareable URL based on the state and router', () => {
      const mockRouter = { asPath: '/path', locale: 'en' } as NextRouter

      Object.defineProperty(globalThis, 'window', {
        value: {
          location: {
            href: 'http://example.com/path?param=1#hash-var',
            origin: 'http://example.com',
          },
        },
        writable: true,
      })
      ;(compressDataForUrl as jest.Mock).mockReturnValue('compressedData')

      const url = getShareableUrl(stateMock, mockRouter)
      const expectedUrl = 'http://example.com/en/path?import=compressedData'

      expect(url).toBe(expectedUrl)
    })
  })

  describe('getStateFromJson', () => {
    it('should resolve with InventoryStateType when file content is valid JSON', async () => {
      const mockFile = new File(
        [JSON.stringify({ items: ['item1', 'item2'] })],
        'state.json',
        { type: 'application/json' },
      )
      const result = await getStateFromJson(mockFile)
      expect(result).toEqual({ items: ['item1', 'item2'] })
    })

    it('should reject with error when file content is invalid JSON', async () => {
      const mockFile = new File(['{ a: invalid json'], 'state.json', {
        type: 'application/json',
      })
      await expect(getStateFromJson(mockFile)).rejects.toThrow(
        'Cannot parse JSON file',
      )
    })

    it('should reject with error when file is not provided', async () => {
      await expect(
        getStateFromJson(
          // @ts-ignore
          null,
        ),
      ).rejects.toThrow('File is not found')
    })

    it('should reject with error when FileReader does not return text', async () => {
      const mockFile = new File([''], 'state.json', {
        type: 'application/json',
      })
      await expect(getStateFromJson(mockFile)).rejects.toThrow(
        'Cannot get file content',
      )
    })
  })
})
