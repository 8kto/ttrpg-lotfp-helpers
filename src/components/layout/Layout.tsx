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
  // TODO FIXME these icons are not displayed
  return (
    // <html lang='en' className={regularFont.variable}>
    <>
      <UiProvider>
        <Header />
        {children}
        <Footer />
      </UiProvider>
    </>
    // </html>
  )
}
