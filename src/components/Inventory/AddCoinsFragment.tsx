import React from 'react'

const AddCoinsFragment = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <h5
        id='drawer-label'
        className='mb-6 inline-flex items-center text-gray-500'
      >
        New Product
      </h5>
      <button
        onClick={onClose}
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
    </>
  )
}

export default AddCoinsFragment
