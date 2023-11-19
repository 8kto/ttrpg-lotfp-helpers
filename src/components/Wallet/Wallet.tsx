import React, { useState } from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import { t } from '@/locale/helpers'
import { useInventoryState } from '@/state/InventoryState'

const Wallet = () => {
  const [isManaged, setIsManaged] = useState(false)
  const [isCoinsEncumbranceEnabled, setIsCoinsEncumbranceEnabled] =
    useState(true)

  const { state } = useInventoryState()
  const { copperPieces } = state

  return (
    <div className='px-4 sm:px-0'>
      {/* 1st row */}
      <div className='mb-2'>
        <CostFragment cost={copperPieces.get() ? copperPieces.get() / 10 : 0} />
      </div>
      {/* 2nd row */}
      {/* TODO make switcher smaller */}
      <>
        <label className='relative inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            checked={isManaged}
            className='peer sr-only'
            onChange={() => {
              setIsManaged((v) => !v)
            }}
          />
          <div className="peer h-6 w-11 scale-90 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300"></div>
          <span
            className='ms-2'
            title={t(
              'Enable automatic subtraction of money when equipment items are added',
            )}
          >
            {t('Manage')}
          </span>
        </label>
        <label className='relative inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            checked={isCoinsEncumbranceEnabled}
            className='peer sr-only'
            onChange={() => {
              setIsCoinsEncumbranceEnabled((v) => !v)
            }}
          />
          <div className="peer h-6	w-11 scale-90 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300"></div>
          <span
            className='ms-2'
            title={t(
              'Enable the weight of coins for encumbrance calculations.',
            )}
          >
            {t('Include the weight')}
          </span>
        </label>
      </>
    </div>
  )
}

export default Wallet
