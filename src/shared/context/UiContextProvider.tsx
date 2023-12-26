'use client'
import React, { useState } from 'react'

import type { UiContextType } from './uiContext'
import UiContext, { defaultUiState } from './uiContext'

const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [uiState, setUiState] = useState<UiContextType['uiState']>(
    defaultUiState.uiState,
  )

  const updateUiState = (newState: Partial<UiContextType['uiState']>) => {
    setUiState((state) => ({ ...state, ...newState }))
  }

  return (
    <UiContext.Provider value={{ uiState, updateUiState }}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider
