import type { ComponentType, LazyExoticComponent } from 'react'
import { lazy } from 'react'

import type { LOCALE_SHORT } from '@/translations/languages'
import { DEFAULT_LOCALE } from '@/translations/languages'

type PageEntry = Partial<
  Record<LOCALE_SHORT, LazyExoticComponent<ComponentType>>
>

export const contentComponents: Record<string, PageEntry> = {
  about: {
    [DEFAULT_LOCALE]: lazy(() => import('@/translations/pages/en/about')),
    ru: lazy(() => import('@/translations/pages/ru/about')),
  },
}
