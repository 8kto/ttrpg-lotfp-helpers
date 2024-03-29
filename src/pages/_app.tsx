import './globals.css'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import type { ReactElement, ReactNode } from 'react'

import ErrorBoundary from '@/components/ErrorBoundary'
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
    <>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, viewport-fit=cover, width=device-width'
        ></meta>
      </Head>
      <I18nProvider i18n={i18n}>
        <RootLayout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <SpeedInsights />
        </RootLayout>
      </I18nProvider>
    </>
  )
}
