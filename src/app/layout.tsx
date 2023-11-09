import { AppMetadata } from '@/shared/config/AppMetadata'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { regularFont, cursiveFont } from '@/app/fonts'

import './globals.css'

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
