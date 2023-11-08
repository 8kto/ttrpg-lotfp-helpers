import React from 'react'

const Header = () => {
  return (
    <header>
      <nav
        className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-3 px-4">
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <div className="flex justify-start items-center">
            <a href="/" className="flex mr-14">
              <img src="https://fastly.picsum.photos/id/237/200/300.jpg" className="mr-3 h-8" alt=""/>
              <span
                className="self-center hidden sm:flex text-2xl font-semibold whitespace-nowrap dark:text-white"
              >
                Flame Princess little helpers
              </span>
            </a>

            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
              <ul className="flex flex-col mt-4 space-x-6 text-sm font-medium lg:flex-row xl:space-x-8 lg:mt-0">
                <li>
                  <a href="#" className="block rounded text-primary-700 dark:text-primary-500"
                     aria-current="page">Home</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header