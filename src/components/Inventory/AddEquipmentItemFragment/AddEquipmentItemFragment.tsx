import { XMarkIcon } from '@heroicons/react/24/solid'
import classnames from 'classnames'
import React, { useState } from 'react'

import { t } from '@/locale/helpers'

const AddEquipmentItemFragment = ({ onClose }: { onClose: () => void }) => {
  const [coins, setCoins] = useState<number | ''>('')
  const [isCopperPieces, setIsCopperPieces] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleAddItem = () => {}

  const handleCoinsChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const target = event.target as HTMLInputElement
    if (+target.value) {
      setCoins(+target.value)
    }
  }

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    if (coins === 0) {
      setCoins('') // Clear the input when it's focused with value 0
    }
  }

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === 'Enter') {
      handleAddItem()
    }
  }

  return (
    <>
      <h5
        id='drawer-label'
        className='ph-color-accent mb-6 inline-flex items-center text-2xl'
      >
        {t('Add equipment item')}
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

      {/* Name row */}
      <div className='mb-6 space-y-2'>
        <label
          htmlFor='item-name'
          className='mb-1 block font-medium text-gray-700'
        >
          {t('Name')}
        </label>
        <div className='relative'>
          <input
            type='text'
            name='item-name'
            id='item-name'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
            value={''}
            onChange={handleCoinsChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>

      {/* Category row */}
      <div className='mb-6 space-y-2'>
        <label
          htmlFor='item-category'
          className='mb-1 block font-medium text-gray-700'
        >
          {t('Category')}
        </label>
        <div className='relative'>
          <button
            id='dropdownDefaultButton'
            className='inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
            type='button'
            onClick={() => {
              setIsOpen((v) => !v)
            }}
          >
            {t('Miscellaneous Equipment')}
          </button>
          <div
            className={classnames(
              'z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow',
              {
                hidden: !isOpen,
              },
            )}
          >
            <ul
              className='py-2 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdownDefaultButton'
            >
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Armor
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Missile Weapons
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cost row */}
      <div className='mb-6 space-y-2'>
        <label
          htmlFor='item-cost'
          className='mb-1 block font-medium text-gray-700'
        >
          {t('Price')}{' '}
          <em className='text-sm text-gray-400'>({t('optional')})</em>
        </label>
        <div className='relative'>
          <input
            type='number'
            name='item-cost'
            id='item-cost'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600'
            placeholder='0'
            value={coins === 0 ? '' : coins}
            onChange={handleCoinsChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyPress}
          />
          <span className='absolute inset-y-0 right-3 inline-flex items-center text-base text-gray-400'>
            {isCopperPieces ? t('CP') : t('SP')}
          </span>
        </div>
        {/* Checkbox */}
        <div className='flex items-center'>
          <input
            checked={isCopperPieces}
            onChange={() => setIsCopperPieces((v) => !v)}
            id='copper-coins--add-coins'
            type='checkbox'
            value=''
            className='h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
          />
          <label
            htmlFor='copper-coins--add-coins'
            className='ms-2 cursor-pointer text-sm font-medium text-gray-900'
          >
            {t('Copper pieces')}
          </label>
        </div>

        <div className='bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4'>
          <button
            onClick={handleAddItem}
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

export default AddEquipmentItemFragment
