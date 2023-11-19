import { XMarkIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

import { t } from '@/locale/helpers'
import { addCopperPieces } from '@/state/InventoryState'

const AddCoinsFragment = ({ onClose }: { onClose: () => void }) => {
  const [isCopperPieces, setIsCopperPieces] = useState(false)
  const [coins, setCoins] = useState<number>()

  const handleCoinsChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const target = event.target as HTMLInputElement
    if (+target.value) {
      setCoins(+target.value)
    }
  }

  const handleAddCoins = () => {
    if (coins) {
      const amount = isCopperPieces ? coins : coins * 10
      addCopperPieces(amount)
      setCoins(0)
    }
  }

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    if (coins === 0) {
      setCoins(undefined) // Clear the input when it's focused with value 0
    }
  }

  // TODO fix warnings about controlled/uncontrolled (undefined to number)
  // TODO add on enter

  return (
    <>
      <h5
        id='drawer-label'
        className='ph-color-accent mb-6 inline-flex items-center text-2xl'
      >
        {t('Add coins')}
      </h5>
      <button
        onClick={onClose}
        type='button'
        data-drawer-dismiss='drawer-create-product-default'
        aria-controls='drawer-create-product-default'
        className='absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <XMarkIcon className='h-5 w-5' />
      </button>
      <div className='space-y-4'>
        <label htmlFor='coins' className='mb-2 block font-medium text-gray-700'>
          {t('Enter coin amount. Use copper pieces instead of float numbers.')}
        </label>
        <div className='relative'>
          <input
            type='number'
            name='coins'
            id='coins'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
            placeholder='0'
            value={coins === undefined ? '' : coins}
            onChange={handleCoinsChange}
            onFocus={handleFocus}
          />
          <span className='absolute inset-y-0 right-3 inline-flex items-center text-base text-gray-400'>
            {isCopperPieces ? t('CP') : t('SP')}
          </span>
        </div>

        <div className='flex items-center'>
          <input
            checked={isCopperPieces}
            onChange={() => setIsCopperPieces((v) => !v)}
            id='copper-coins'
            type='checkbox'
            value=''
            className='h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
          />
          <label
            htmlFor='copper-coins'
            className='ms-2 cursor-pointer text-sm font-medium text-gray-900'
          >
            {t('Copper pieces')}
          </label>
        </div>

        <div className='bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4'>
          <button
            onClick={handleAddCoins}
            type='button'
            className='ph-btn-primary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
          >
            {t('Add')}
          </button>
        </div>
      </div>
    </>
  )
}

export default AddCoinsFragment
