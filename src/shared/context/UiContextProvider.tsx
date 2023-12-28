'use client'
import React, { useEffect, useState } from 'react'

import updateHashState from '@/shared/helpers/updateHashState'
import useUiContextFromHashParams from '@/shared/hooks/useUiContextFromHashParams'

import type { UiContextType } from './uiContext'
import UiContext, { defaultUiState } from './uiContext'

const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const uiContextFromHashParams = useUiContextFromHashParams()
  const [uiState, setUiState] = useState<UiContextType['uiState']>({
    ...defaultUiState.uiState,
    ...uiContextFromHashParams,
  })

  useEffect(() => {
    updateHashState(uiState)
  }, [uiState])

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
