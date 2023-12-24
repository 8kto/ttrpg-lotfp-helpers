import './globals.css'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

import RootLayout from '@/components/layout/Layout'
import { useLinguiInit } from '@/translations/utils'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useLinguiInit(pageProps.translation)

  return (
    <I18nProvider i18n={i18n}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </I18nProvider>
  )
}
// TODO try SpeedInsights