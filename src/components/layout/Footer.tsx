import React from 'react'

const Footer = () => {
  return (
    <footer className='relative mx-auto w-full max-w-screen-2xl bg-gray-50 px-4 py-6 md:flex md:items-center md:justify-between md:py-10 2xl:px-0'>
      <p className='mb-4 text-center text-sm text-gray-500 md:mb-0'>
        © 2023{' '}
        <a href='' className='hover:underline' target='_blank'>
          undefined
        </a>
        .
      </p>
      <ul className='flex flex-wrap items-center justify-center'>
        <li>
          <a
            href='#'
            className='text-sm font-normal text-gray-500 hover:underline dark:text-gray-400'
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
