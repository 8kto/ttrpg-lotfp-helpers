import Image from 'next/image'
import React, { useState } from 'react'

import isDevEnv from '@/shared/helpers/isDevEnv'

const Footer = () => {
  const [viewportDebugHidden, setViewportDebugHidden] = useState(false)

  return (
    <footer className='relative mx-auto my-4 w-full max-w-screen-2xl px-4 text-sm md:my-6 2xl:px-8'>
      <p className='flex items-center justify-center text-center text-gray-500 md:mb-0'>
        <Image
          src='/icons/favicon-64x64.png'
          className='mr-1 h-8 w-8'
          alt='Flame Princess'
          width='32'
          height='32'
        />
        ©<span className='mr-1'>2023-2024</span>
        <a
          href='https://ivlev.blog'
          className='hover:underline'
          target='_blank'
        >
          Igor Okto (undefined)
        </a>
      </p>
      {isDevEnv() && (
        <span
          className={`ml-4 items-center justify-center text-center text-gray-500 ${
            viewportDebugHidden ? 'hidden' : 'flex'
          }`}
          onClick={() => setViewportDebugHidden(true)}
        >
          Active viewport:
          <span className='mr-1'>XS</span>
          <span className='mr-1 hidden sm:block'>SM</span>
          <span className='mr-1 hidden md:block'>MD</span>
          <span className='mr-1 hidden lg:block'>LG</span>
          <span className='mr-1 hidden xl:block'>XL</span>
          <span className='mr-1 hidden 2xl:block'>2XL</span>
        </span>
      )}
    </footer>
  )
}

export default Footer
