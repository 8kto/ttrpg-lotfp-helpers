'use client'

import { Trans } from '@lingui/macro'
import Link from 'next/link'
import React from 'react'

import LocaleSwitcher from '@/components/layout/LocaleSwitcher'

import { cursiveFont } from './fonts'

const Header = () => {
  return (
    <header>
      <nav className='ph-header-wrapper fixed z-30 w-full border-2 border-b border-gray-400 px-4 py-4 text-white'>
        <div className='mx-auto w-full max-w-screen-2xl flex-grow px-0 sm:px-4 lg:px-4 xl:px-8 flex items-center justify-between'>
          <div className='flex items-center justify-start'>
            <Link href='/' className='mr-14 flex'>
              <h1
                className={`${cursiveFont.className} self-center whitespace-nowrap text-3xl font-semibold sm:flex`}
              >
                <Trans>Princess Helpers</Trans>
              </h1>
            </Link>
          </div>

          <div className='flex items-center'>
            <LocaleSwitcher />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
