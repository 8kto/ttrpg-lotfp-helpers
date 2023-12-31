import { decompressDataFromUrl } from '@/shared/helpers/compressDataForUrl'
import type { InventoryStateType } from '@/state/InventoryState'
import { setState } from '@/state/InventoryState'

export const getImportUrlParameter = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const importString = urlParams.get('import')?.trim()

  return importString && typeof window !== 'undefined' ? importString : null
}

export const setStateFromTheCompressedUrlData = (input: string): void => {
  const state = decompressDataFromUrl<InventoryStateType>(input)

  if (state) {
    setState(state)
  }
}

export const resetUrlParams = () => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    const currentUrlWithoutUrlParams = url.origin + url.pathname

    window.location.replace(currentUrlWithoutUrlParams)
  }
}
