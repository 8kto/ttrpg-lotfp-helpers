import React from 'react'

import { cursiveFont } from '@/app/fonts'

const Header = () => {
  return (
    <header>
      <nav className='fixed z-30 w-full border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800'>
        <div className='mx-auto flex max-w-screen-2xl items-center justify-between'>
          <div className='flex items-center justify-start'>
            <a href='/' className='mr-14 flex'>
              <h1
                className={`${cursiveFont.className} hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white sm:flex`}
              >
                Princess Helpers
              </h1>
            </a>

            <div className='hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto'>
              <ul className='mt-4 flex flex-col space-x-6 text-sm font-medium lg:mt-0 lg:flex-row xl:space-x-8'>
                <li>
                  <a
                    href='#'
                    className='block rounded text-primary-700 dark:text-primary-500'
                    aria-current='page'
                  >
                    Home
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
