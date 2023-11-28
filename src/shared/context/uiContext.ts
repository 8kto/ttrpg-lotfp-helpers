import { createContext } from 'react'

export type UiContextType = {
  uiState: {
    isInventoryVisible: boolean
  }
  updateUiState: (newState: UiContextType['uiState']) => void
}

export const defaultUiState: UiContextType = {
  uiState: {
    isInventoryVisible: false,
  },
  updateUiState: () => defaultUiState,
}

const UiContext = createContext<UiContextType>(defaultUiState)

export default UiContext
