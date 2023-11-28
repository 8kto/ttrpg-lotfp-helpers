import './globals.css'

import { cursiveFont, regularFont } from '@/app/fonts'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { AppMetadata } from '@/config/AppMetadata'
import UiProvider from '@/shared/context/UiContextProvider'

export const metadata = AppMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={regularFont.variable}>
      <head>
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
      </head>
      <body className={`${cursiveFont.variable} bg-gray-50 bg-none`}>
        <UiProvider>
          <Header />
          {children}
          <Footer />
        </UiProvider>
      </body>
    </html>
  )
}
