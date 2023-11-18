import React, { useState } from 'react'

import Drawer from '@/components/Drawer/Drawer'
import { useInventoryState } from '@/state/InventoryState'

const InventoryControls = () => {
  const { resetEquipment } = useInventoryState()
  const handleReset = () => resetEquipment()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      <div className='flex items-center sm:justify-end'>
        <div className='flex space-x-1 pl-2'>
          <a
            href='#'
            onClick={handleReset}
            title={'Reset'}
            className='inline-flex cursor-pointer justify-center rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            <svg
              className='h-6 w-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <div className='text-center'>
        <button
          className='mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          type='button'
          onClick={handleOpenDrawer}
        >
          Show drawer form
        </button>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        ariaLabelledBy={'drawer-label'}
      >
        <h5
          id='drawer-label'
          className='mb-6 inline-flex items-center text-gray-500'
        >
          New Product
        </h5>
        <button
          onClick={() => {
            setIsDrawerOpen(false)
          }}
          type='button'
          data-drawer-dismiss='drawer-create-product-default'
          aria-controls='drawer-create-product-default'
          className='absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
        >
          <svg
            aria-hidden='true'
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clip-rule='evenodd'
            ></path>
          </svg>
          <span className='sr-only'>Close menu</span>
        </button>
        <form action='#'>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
              >
                Name
              </label>
              <input
                type='text'
                name='title'
                id='name'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                placeholder='Type product name'
                required
              />
            </div>

            <div>
              <label
                htmlFor='price'
                className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
              >
                Price
              </label>
              <input
                type='number'
                name='price'
                id='price'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                placeholder='$2999'
              />
            </div>

            <div className='bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4'>
              <button
                type='button'
                className='w-full justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Add product
              </button>
            </div>
          </div>
        </form>
      </Drawer>
    </>
  )
}

export default InventoryControls
