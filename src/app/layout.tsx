import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'LotFP Helpers',
  description: 'Lamentations of the Flame Princess helpers',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className + ' ' + 'bg-none bg-gray-50'}>
    <header>
      <nav
        className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-3 px-4">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <div className="flex justify-start items-center">
            <a href="/" className="flex mr-14">
              <img src="https://fastly.picsum.photos/id/237/200/300.jpg" className="mr-3 h-8" alt=""/>
              <span
                className="self-center hidden sm:flex text-2xl font-semibold whitespace-nowrap dark:text-white">Home</span>
            </a>

            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
              <ul className="flex flex-col mt-4 space-x-6 text-sm font-medium lg:flex-row xl:space-x-8 lg:mt-0">
                <li>
                  <a href="#" className="block rounded text-primary-700 dark:text-primary-500"
                     aria-current="page">Home</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    {children}
    <footer className="relative w-full mx-auto max-w-screen-2xl bg-gray-50 md:flex md:items-center md:justify-between px-4 2xl:px-0 py-6 md:py-10">
      <p className="text-sm text-center text-gray-500 mb-4 md:mb-0">
        © 2023 <a href="" className="hover:underline" target="_blank">undefined</a>.
      </p>
      <ul className="flex flex-wrap items-center justify-center">
        <li><a href="#" className="text-sm font-normal text-gray-500 hover:underline dark:text-gray-400">Contact</a></li>
      </ul>
    </footer>
    </body>
    </html>
  )
}
