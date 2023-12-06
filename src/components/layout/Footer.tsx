import React from 'react'

const Footer = () => {
  return (
    <footer className='relative mx-auto w-full max-w-screen-2xl bg-gray-50 px-4 py-6 md:flex md:items-center md:justify-between md:py-10 2xl:px-0'>
      <p className='mb-4 md:mb-0 text-center text-gray-500'>
        © 2023{' '}
        <a
          href='https://ivlev.blog'
          className='hover:underline'
          target='_blank'
        >
          Igor Okto (undefined)
        </a>
      </p>
      <p className="flex items-center text-gray-500">
        Active viewport:
        <span className="mr-1">XS</span>
        <span className="hidden sm:block mr-1">SM</span>
        <span className="hidden md:block mr-1">MD</span>
        <span className="hidden lg:block mr-1">LG</span>
        <span className="hidden xl:block mr-1">XL</span>
        <span className="hidden 2xl:block mr-1">2XL</span>
      </p>
    </footer>
  )
}

export default Footer
