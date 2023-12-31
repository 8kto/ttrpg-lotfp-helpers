import type { NextRouter } from 'next/router'

import { compressDataForUrl } from '@/shared/helpers/compressDataForUrl'
import type { InventoryStateType } from '@/state/InventoryState'

export const getShareableUrl = (
  state: InventoryStateType,
  router: NextRouter,
) => {
  let url = ''

  if (typeof window !== 'undefined') {
    url = `${window.location.origin}/${router.locale}${router.asPath}`
  }
  url += `?import=${compressDataForUrl(state)}`

  return url
}

export const restoreStateFromJson = (
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
