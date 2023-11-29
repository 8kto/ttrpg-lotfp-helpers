'use client'

import { InboxStackIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React, { useContext } from 'react'

import LocaleSwitcher from '@/components/layout/LocaleSwitcher'
import { t } from '@/locale/helpers'
import UiContext from '@/shared/context/uiContext'

import { cursiveFont } from './fonts'

const Header = () => {
  const {
    uiState: { isInventoryVisible },
    updateUiState,
  } = useContext(UiContext)

  return (
    <header>
      <nav className='ph-header-wrapper fixed z-30 w-full border-b border-gray-200 px-4 py-3 text-white'>
        <div className='mx-auto flex max-w-screen-2xl items-center justify-between'>
          <div className='flex items-center justify-start'>
            <Link href='/' className='mr-14 flex'>
              <h1
                className={`${cursiveFont.className} self-center whitespace-nowrap text-2xl font-semibold sm:flex`}
              >
                {t('Princess Helpers')}
              </h1>
            </Link>
          </div>

          <div className='flex items-center'>
            <LocaleSwitcher />

            <button
              className='ph-btn-primary z-50 inline-flex cursor-pointer items-center justify-center rounded p-2 focus:outline-none lg:hidden'
              onClick={() =>
                updateUiState({
                  isInventoryVisible: !isInventoryVisible,
                })
              }
            >
              <InboxStackIcon className='mr-2 h-5 w-5' /> {t('Inventory')}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
