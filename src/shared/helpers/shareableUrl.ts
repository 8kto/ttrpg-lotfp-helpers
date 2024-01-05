import type { NextRouter } from 'next/router'

import { compressDataForUrl } from '@/shared/helpers/compressDataForUrl'
import type { InventoryStateType } from '@/state/InventoryState'

/**
 * @fileOverview Helpers are extracted from the page component and put outside its directory
 * due to Next.js restrictions
 */

export const getImportUrlParameter = (): string | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const urlParams = new URLSearchParams(window.location.search)
  const importString = urlParams.get('import')?.trim()

  return importString ?? null
}

export const resetUrlParams = () => {
  if (typeof window !== 'undefined') {
    const url = new window.URL(window.location.href)
    const currentUrlWithoutUrlParams = url.origin + url.pathname

    window.location.replace(currentUrlWithoutUrlParams)
  }
}

export const getShareableUrl = (
  state: InventoryStateType,
  router: NextRouter,
) => {
  const basePath = typeof window !== 'undefined' ? window.location.origin : ''
  const pathWithoutHash = router.asPath.split('#')[0]
  const url = new URL(`${basePath}/${router.locale}${pathWithoutHash}`)

  url.searchParams.set('import', compressDataForUrl(state))

  return url.toString()
}

export const getStateFromJson = (file: File): Promise<InventoryStateType> => {
  if (!file) {
    return Promise.reject(Error('File is not found'))
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target?.result
      if (!text) {
        reject(new Error('Cannot get file content'))

        return
      }

      try {
        const json = JSON.parse(text.toString())

        resolve(json as InventoryStateType)
      } catch (err) {
        reject(new Error('Cannot parse JSON file'))
      }
    }

    reader.readAsText(file)
  })
}
