import type { LOCALE_SHORT } from '@/translations/languages'

export type TestLocale = {
  locale: LOCALE_SHORT
}
/* CI covers only en and ru; cz runs locally */
export const testLocales: Array<TestLocale> = [
  { locale: 'ru' },
  { locale: 'en' },
  ...(process.env.CI ? [] : [{ locale: 'cz' } as const]),
]
