import { useMemo } from 'react'

import type { UiContextType } from '@/shared/context/uiContext'
import { defaultUiState } from '@/shared/context/uiContext'
import getStateFromSearchString from '@/shared/helpers/getStateFromSearchString'

const useUiContextFromHashParams = (): Partial<UiContextType['uiState']> => {
  const hash =
    typeof window !== 'undefined' ? window.location.hash.substring(1) : ''

  return useMemo(() => {
    return getStateFromSearchString(hash, defaultUiState.uiState)
  }, [hash])
}

export default useUiContextFromHashParams
