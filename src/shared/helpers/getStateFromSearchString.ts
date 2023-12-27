import { defaultUiState, type UiContextType } from '@/shared/context/uiContext'

const getStateFromSearchString = (
  searchParamsString: string,
): Partial<UiContextType['uiState']> => {
  const searchParams = new URLSearchParams(searchParamsString)
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
}

export default getStateFromSearchString
