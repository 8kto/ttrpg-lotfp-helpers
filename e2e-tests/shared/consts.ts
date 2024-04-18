import type { LOCALE_SHORT } from '@/translations/languages'

export type TestLocale = {
  locale: LOCALE_SHORT
}
export const testLocales: Array<TestLocale> = [
  { locale: 'ru' },
  { locale: 'en' },
  { locale: 'cz' },
]