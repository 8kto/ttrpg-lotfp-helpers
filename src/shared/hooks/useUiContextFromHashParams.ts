import { useMemo } from 'react'

import type { UiContextType } from '@/shared/context/uiContext'
import { defaultUiState } from '@/shared/context/uiContext'

const useUiContextFromHashParams = (): Partial<UiContextType['uiState']> => {
  const hash =
    typeof window !== 'undefined' ? window.location.hash.substring(1) : ''

  return useMemo(() => {
    const searchParams = new URLSearchParams(hash)
    const params: Record<string, unknown> = {}

    for (const [key, value] of searchParams) {
      if (key in defaultUiState.uiState) {
        const defaultValue =
          defaultUiState.uiState[key as keyof UiContextType['uiState']]

        if (typeof defaultValue === 'number') {
          params[key as keyof UiContextType['uiState']] = Number(value)
        } else if (typeof defaultValue === 'boolean') {
          params[key as keyof UiContextType['uiState']] = value === 'true'
        } else {
          params[key as keyof UiContextType['uiState']] = value
        }
      }
    }

    return params
  }, [hash])
}

export default useUiContextFromHashParams
