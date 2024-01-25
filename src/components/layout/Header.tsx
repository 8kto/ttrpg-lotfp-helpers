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
        <div className='mx-auto flex w-full max-w-screen-2xl items-center justify-between px-0 sm:px-4 lg:px-4 xl:px-8'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <h1
                className={`${cursiveFont.className} whitespace-nowrap text-2xl font-semibold sm:text-3xl`}
              >
                <Trans>Princess Helpers</Trans>
              </h1>
            </Link>
          </div>

          <div className='flex items-center gap-8'>
            <LocaleSwitcher />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
