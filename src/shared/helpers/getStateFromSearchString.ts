import { type UiContextType } from '@/shared/context/uiContext'

const getStateFromSearchString = <T extends Record<string, unknown>>(
  searchParamsString: string,
  storage: T,
): Partial<T> => {
  const searchParams = new URLSearchParams(searchParamsString)
  const params: Record<string, unknown> = {}

  for (const [key, value] of searchParams) {
    if (key in storage) {
      const defaultValue = storage[key as keyof T]

      if (typeof defaultValue === 'number') {
        params[key as keyof UiContextType['uiState']] = Number(value)
      } else if (typeof defaultValue === 'boolean') {
        params[key as keyof UiContextType['uiState']] = value === 'true'
      } else {
        params[key as keyof UiContextType['uiState']] = value
      }
    }
  }

  return params as Partial<T>
}

export default getStateFromSearchString
