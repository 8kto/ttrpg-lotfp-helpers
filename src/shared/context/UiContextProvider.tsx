'use client'
import React, { useState } from 'react'

import useUiContextFromHashParams from '@/shared/hooks/useUiContextFromHashParams'

import type { UiContextType } from './uiContext'
import UiContext, { defaultUiState } from './uiContext'

const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const uiContextFromHashParams = useUiContextFromHashParams()
  const [uiState, setUiState] = useState<UiContextType['uiState']>({
    ...defaultUiState.uiState,
    ...uiContextFromHashParams,
  })

  const updateUiState = (newState: Partial<UiContextType['uiState']>) => {
    setUiState((state) => {
      const merged = { ...state, ...newState }

      window.location.hash = new URLSearchParams(
        merged as unknown as Record<string, string>,
      ).toString()

      return merged
    })
  }

  return (
    <UiContext.Provider value={{ uiState, updateUiState }}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider
