import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import NavigationLinks from '@/components/layout/NavigationLinks'
import isDevEnv from '@/shared/helpers/isDevEnv'

const Footer = () => {
  const [viewportDebugHidden, setViewportDebugHidden] = useState(false)

  return (
    <footer className='text-base text-gray-700'>
      <div className='mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          <div className='mb-2 text-base md:mb-0'>
            <NavigationLinks />
            <Link
              href='https://github.com/8kto/ttrpg-lotfp-helpers'
              target='_blank'
              className='ph-color-accent hover:underline underline-offset-4'
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
              className='mr-2'
            />
            <span className='text-sm'>
              © 2023-2024{' '}
              <Link
                href='https://ivlev.blog/'
                className='hover:underline underline-offset-4'
                target='_blank'
              >
                Igor Okto (undefined)
              </Link>
            </span>
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
