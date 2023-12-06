import { createContext } from 'react'

export type UiContextType = {
  uiState: {
    activeTabId: number
  }
  updateUiState: (newState: UiContextType['uiState']) => void
}

export const defaultUiState: UiContextType = {
  uiState: {
    activeTabId: 0,
  },
  updateUiState: () => defaultUiState,
}

const UiContext = createContext<UiContextType>(defaultUiState)

export default UiContext
