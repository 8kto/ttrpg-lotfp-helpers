import {Inter} from 'next/font/google'

import {AppMetadata} from "@/shared/config/AppMetadata"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import {interFont, neuchaFont} from "@/app/fonts"

import './globals.css'

export const metadata = AppMetadata

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={interFont.variable}>
      <body className={`${neuchaFont.variable} bg-none bg-gray-50`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
