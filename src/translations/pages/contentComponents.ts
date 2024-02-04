import type { ComponentType, LazyExoticComponent } from 'react'
import { lazy } from 'react'

import type { LOCALE_SHORT } from '@/translations/languages'
import { DEFAULT_LOCALE } from '@/translations/languages'

type PageEntry = Partial<
  Record<LOCALE_SHORT, LazyExoticComponent<ComponentType>>
>

const contentComponents: Record<string, PageEntry> = {
  about: {
    [DEFAULT_LOCALE]: lazy(() => import('@/translations/pages/en/About')),
    ru: lazy(() => import('@/translations/pages/ru/About')),
  },
  'encumbrance-reference': {
    [DEFAULT_LOCALE]: lazy(() => import('@/translations/pages/en/EncumbranceReference')),
    ru: lazy(() => import('@/translations/pages/ru/EncumbranceReference')),
  },
}

export default contentComponents
