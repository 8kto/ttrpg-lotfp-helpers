import { i18n } from '@lingui/core'

/**
 * @deprecated
 * @param id
 */
export const t = (id: string) => {
  // TODO return translated string
  return i18n._(id)
}
