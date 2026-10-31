import { useEffect, useRef } from 'react'

import { importSharedInventory } from '@/shared/helpers/importSharedInventory'
import {
  getImportUrlParameter,
  resetUrlParams,
} from '@/shared/helpers/shareableUrl'

/**
 * Import the inventory from the URL once. Strict mode runs effects twice, and
 * the URL still holds the parameter then, which would repeat the confirmation.
 */
const useSharedInventoryImport = () => {
  const isHandled = useRef(false)

  useEffect(() => {
    if (isHandled.current) {
      return
    }
    isHandled.current = true

    const importUrlParameter = getImportUrlParameter()

    if (importUrlParameter) {
      importSharedInventory(importUrlParameter)
      resetUrlParams()
    }
  }, [])
}

export default useSharedInventoryImport
