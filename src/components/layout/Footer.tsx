import React from 'react'

const Footer = () => {
  return (
    <footer className='relative mx-auto w-full max-w-screen-2xl bg-gray-50 px-4 py-6 md:flex md:items-center md:justify-between md:py-10 2xl:px-8'>
      <p className='mb-4 text-center text-gray-500 md:mb-0'>
        © 2023{' '}
        <a
          href='https://ivlev.blog'
          className='hover:underline'
          target='_blank'
        >
          Igor Okto (undefined)
        </a>
      </p>
      {process.env.NODE_ENV === 'development' && (
        <p className='flex items-center justify-center text-gray-500 text-center'>
          Active viewport:
          <span className='mr-1'>XS</span>
          <span className='mr-1 hidden sm:block'>SM</span>
          <span className='mr-1 hidden md:block'>MD</span>
          <span className='mr-1 hidden lg:block'>LG</span>
          <span className='mr-1 hidden xl:block'>XL</span>
          <span className='mr-1 hidden 2xl:block'>2XL</span>
        </p>
      )}
    </footer>
  )
}

export default Footer
