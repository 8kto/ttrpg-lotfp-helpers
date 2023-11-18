import React from 'react'

import { useInventoryState } from '@/state/InventoryState'

const InventoryControls = () => {
  const { resetEquipment } = useInventoryState()
  const handleReset = () => resetEquipment()

  return (
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
  )
}

export default InventoryControls
