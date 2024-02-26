import { Head, Html, Main, NextScript } from 'next/document'

import { cursiveFont, regularFont } from '@/components/layout/fonts'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className={`${cursiveFont.variable} ${regularFont.variable}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
