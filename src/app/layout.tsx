import {Inter} from 'next/font/google'

import {AppMetadata} from "@/shared/config/AppMetadata"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import './globals.css'

const inter = Inter({subsets: ['latin']})
export const metadata = AppMetadata

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-none bg-gray-50`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
