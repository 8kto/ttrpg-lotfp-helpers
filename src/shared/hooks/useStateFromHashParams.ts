import { useMemo } from 'react'

import getStateFromSearchString from '@/shared/helpers/getStateFromSearchString'
import type { InventoryStateType } from '@/state/InventoryState'
import { getInitialInventoryState } from '@/state/InventoryState'

const useUiContextFromHashParams = (): Partial<InventoryStateType> => {
  const hash =
    typeof window !== 'undefined' ? window.location.hash.substring(1) : ''

  return useMemo(() => {
    return getStateFromSearchString(hash, getInitialInventoryState())
  }, [hash])
}

export default useUiContextFromHashParams
