import type { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/macro'

export type LOCALE = 'en-us' | 'ru-ru' | 'cz-cz' | 'pseudo'
export type LOCALE_SHORT = 'en' | 'ru' | 'cz'

interface Languages {
  locale: LOCALE
  msg: MessageDescriptor
  territory?: string
  rtl: boolean
}

const languages: Languages[] = [
  {
    locale: 'en-us',
    msg: msg`English`,
    rtl: false,
  },
  {
    locale: 'ru-ru',
    msg: msg`Russian`,
    rtl: false,
  },
  {
    locale: 'cz-cz',
    msg: msg`Czech`,
    rtl: false,
  },
]

if (process.env.NODE_ENV !== 'production') {
  languages.push({
    locale: 'pseudo',
    msg: msg`Pseudo`,
    rtl: false,
  })
}

export const DEFAULT_LOCALE = 'en'

export default languages
