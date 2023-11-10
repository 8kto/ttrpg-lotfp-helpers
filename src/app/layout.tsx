import './globals.css'

import { cursiveFont, regularFont } from '@/app/fonts'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { AppMetadata } from '@/config/AppMetadata'

export const metadata = AppMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={regularFont.variable}>
      <body className={`${cursiveFont.variable} bg-gray-50 bg-none`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
