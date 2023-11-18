import React, { useState } from 'react'

import { t } from '@/locale/helpers'

const Wallet = () => {
  const [isManaged, setIsManaged] = useState(false)

  const handleSwitchClick = () => {
    setIsManaged((v) => !v)
  }

  const handleAddClick = () => {}

  return (
    <div>
      <div>
        <div className='flex rounded'>
          <input
            type='text'
            name='coins'
            disabled={!isManaged}
            className='block w-full rounded-bl rounded-tl border border-gray-200 px-3 py-1.5 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50'
          />
          <button
            type='button'
            onClick={handleAddClick}
            disabled={!isManaged}
            className='ph-btn-secondary inline-flex items-center justify-center gap-x-2 rounded-e border border-transparent bg-blue-600 px-3 py-1.5 text-sm disabled:pointer-events-none disabled:opacity-50'
          >
            {t('Add')}
          </button>
        </div>
      </div>
      <label className='relative mt-2 inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          checked={isManaged}
          className='peer sr-only'
          onChange={handleSwitchClick}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300"></div>
        <span
          className='ms-3'
          title={t(
            'Enable automatic subtraction of money when equipment items are added',
          )}
        >
          {t('Manage')}
        </span>
      </label>
    </div>
  )
}

export default Wallet
