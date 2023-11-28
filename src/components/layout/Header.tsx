'use client'

import { InboxStackIcon } from '@heroicons/react/24/solid'
import React, { useContext } from 'react'

import { cursiveFont } from '@/app/fonts'
import { t } from '@/locale/helpers'
import UiContext from '@/shared/context/uiContext'

const Header = () => {
  const {
    uiState: { isInventoryVisible },
    updateUiState,
  } = useContext(UiContext)

  return (
    <header>
      <nav className='text-white fixed z-30 w-full border-b border-gray-200 px-4 py-3'
           style={{
             background: 'url(/images/img-noise-361x370-2.png)',
           }}
      >
        <div className='mx-auto flex max-w-screen-2xl items-center justify-between'>
          <div className='flex items-center justify-start'>
            <a href='/' className='mr-14 flex'>
              <h1
                className={`${cursiveFont.className} self-center whitespace-nowrap text-2xl font-semibold sm:flex`}
              >
                Princess Helpers
              </h1>
            </a>
          </div>
          <div className='flex items-center'>
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
