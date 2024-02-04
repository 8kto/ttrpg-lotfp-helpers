import { Trans } from '@lingui/macro'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

import NavigationLinks from '@/components/layout/NavigationLinks'
import UiContext from '@/shared/context/uiContext'
import isDevEnv from '@/shared/helpers/isDevEnv'

const Footer = () => {
  const [viewportDebugHidden, setViewportDebugHidden] = useState(false)
  const {
    uiState: { version },
  } = useContext(UiContext)

  return (
    <footer className='text-base text-gray-700'>
      <div className='mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-between'>
          <div className='mb-4 max-w-full whitespace-normal break-words text-base'>
            <NavigationLinks />
            <Link
              href='https://github.com/8kto/ttrpg-lotfp-helpers'
              target='_blank'
              className='ph-color-accent underline-offset-4 hover:underline whitespace-nowrap'
            >
              GitHub
            </Link>
          </div>
          <div className='flex items-center'>
            <Image
              src='/icons/favicon-64x64.png'
              alt='Flame Princess'
              width='32'
              height='32'
              className='mr-1'
            />
            <div className='inline-block text-sm text-gray-600'>
              <Trans>Princess Helpers</Trans> v{version}{' '}
              <span className='ml-4'>© 2023-2024 </span>
              <Link
                href='https://ivlev.blog/'
                className='whitespace-nowrap underline-offset-4 hover:underline'
                target='_blank'
              >
                Igor Okto (undefined)
              </Link>
            </div>
          </div>
        </div>
        {isDevEnv() && (
          <div
            className={`mt-6 text-center ${
              viewportDebugHidden ? 'hidden' : ''
            }`}
            onClick={() => setViewportDebugHidden(true)}
            title='Click to hide'
          >
            Active viewport:
            <span className='mx-1'>XS</span>
            <span className='mx-1 hidden sm:inline'>SM</span>
            <span className='mx-1 hidden md:inline'>MD</span>
            <span className='mx-1 hidden lg:inline'>LG</span>
            <span className='mx-1 hidden xl:inline'>XL</span>
            <span className='mx-1 hidden 2xl:inline'>2XL</span>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
