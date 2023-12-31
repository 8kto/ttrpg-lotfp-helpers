import type { NextRouter } from 'next/router'

import { compressDataForUrl, decompressDataFromUrl } from '@/shared/helpers/compressDataForUrl'
import type { InventoryStateType } from '@/state/InventoryState'
import { setState } from '@/state/InventoryState'

/**
 * @fileOverview Helpers are extracted from the page component and put outside its directory
 * due to NextJS restrictions
 */

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

export const getShareableUrl = (
  state: InventoryStateType,
  router: NextRouter,
) => {
  let url = ''

  if (typeof window !== 'undefined') {
    url = `${window.location.origin}/${router.locale}${router.asPath}`
  }
  url = url.replace(/#.*/g, '')
  url += `?import=${compressDataForUrl(state)}`

  return url
}

export const getStateFromJson = (
  file: File,
): Promise<InventoryStateType> => {
  if (!file) {
    throw new Error('File is not found')
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
