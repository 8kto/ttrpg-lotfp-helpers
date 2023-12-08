import { Head, Html, Main, NextScript } from 'next/document'

import { cursiveFont, regularFont } from '@/components/layout/fonts'

export default function Document() {
  // TODO FIXME these icons are not displayed
  return (
    <Html>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link rel='manifest' href='/icons/site.webmanifest' />
      </Head>
      <body
        className={`${cursiveFont.variable} ${regularFont.className} bg-gray-50 bg-none`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
