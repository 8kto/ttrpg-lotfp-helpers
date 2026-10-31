import { renderHook } from '@testing-library/react'
import { StrictMode } from 'react'

import { importSharedInventory } from '@/shared/helpers/importSharedInventory'
import {
  getImportUrlParameter,
  resetUrlParams,
} from '@/shared/helpers/shareableUrl'
import useSharedInventoryImport from '@/shared/hooks/useSharedInventoryImport'

jest.mock('@/shared/helpers/importSharedInventory', () => ({
  importSharedInventory: jest.fn(),
}))

jest.mock('@/shared/helpers/shareableUrl', () => ({
  getImportUrlParameter: jest.fn(),
  resetUrlParams: jest.fn(),
}))

describe('useSharedInventoryImport', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('imports a link once when effects run twice in strict mode', () => {
    ;(getImportUrlParameter as jest.Mock).mockReturnValue('state')

    renderHook(() => useSharedInventoryImport(), {
      wrapper: StrictMode,
    })

    expect(importSharedInventory).toHaveBeenCalledTimes(1)
    expect(importSharedInventory).toHaveBeenCalledWith('state')
    expect(resetUrlParams).toHaveBeenCalledTimes(1)
  })

  it('does nothing without a link', () => {
    ;(getImportUrlParameter as jest.Mock).mockReturnValue(null)

    renderHook(() => useSharedInventoryImport())

    expect(importSharedInventory).not.toHaveBeenCalled()
    expect(resetUrlParams).not.toHaveBeenCalled()
  })
})
