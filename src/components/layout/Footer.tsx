import React from 'react'

const Footer = () => {
  return (
    <footer className="relative w-full mx-auto max-w-screen-2xl bg-gray-50 md:flex md:items-center md:justify-between px-4 2xl:px-0 py-6 md:py-10">
      <p className="text-sm text-center text-gray-500 mb-4 md:mb-0">
        © 2023 <a href="" className="hover:underline" target="_blank">undefined</a>.
      </p>
      <ul className="flex flex-wrap items-center justify-center">
        <li><a href="#" className="text-sm font-normal text-gray-500 hover:underline dark:text-gray-400">Contact</a></li>
      </ul>
    </footer>
  )
}

export default Footer