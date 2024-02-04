import type { Messages } from '@lingui/core'
import { i18n } from '@lingui/core'
import { useRouter } from 'next/router'
import { type ComponentType, useEffect } from 'react'

import type { LOCALE_SHORT } from '@/translations/languages'
import { DEFAULT_LOCALE } from '@/translations/languages'
import { contentComponents } from '@/translations/pages'

export async function loadCatalog(locale: string) {
  const catalog = await import(`@lingui/loader!./locales/${locale}.po`)

  return catalog.messages
}

export function useLinguiInit(messages: Messages) {
  const router = useRouter()
  const locale = router.locale || router.defaultLocale!
  const isClient = typeof window !== 'undefined'

  if (!isClient && locale !== i18n.locale) {
    // there is single instance of i18n on the server
    // note: on the server, we could have an instance of i18n per supported locale
    // to avoid calling loadAndActivate for (worst case) each request, but right now that's what we do
    i18n.loadAndActivate({ locale, messages })
  }
  if (isClient && i18n.locale === undefined) {
    // first client render
    i18n.loadAndActivate({ locale, messages })
  }

  useEffect(() => {
    const localeDidChange = locale !== i18n.locale
    if (localeDidChange) {
      i18n.loadAndActivate({ locale, messages })
    }
  }, [locale, messages])

  return i18n
}

export const getTranslatedPageContent = (
  pageName: string,
  locale: LOCALE_SHORT,
): ComponentType => {
  const pageEntry = contentComponents[pageName]
  if (!pageEntry) {
    throw new Error(`Unknown page name: ${pageName}`)
  }

  return (pageEntry[locale] || pageEntry[DEFAULT_LOCALE]) as ComponentType
}
