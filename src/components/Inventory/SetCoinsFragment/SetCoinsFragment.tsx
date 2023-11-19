import { XMarkIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'

import { t } from '@/locale/helpers'
import { setCopperPieces, useInventoryState } from '@/state/InventoryState'

const SetCoinsFragment = ({ onClose }: { onClose: () => void }) => {
  const isCopperPiecesDefaultValue = false
  const {
    state: { copperPieces },
  } = useInventoryState()
  const [isCopperPieces, setIsCopperPieces] = useState(
    isCopperPiecesDefaultValue,
  )
  const [coins, setCoins] = useState<number | ''>(
    isCopperPiecesDefaultValue ? copperPieces.get() : copperPieces.get() / 10,
  )

  const handleCoinsChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const target = event.target as HTMLInputElement
    if (+target.value) {
      setCoins(+target.value)
    }
  }

  const handleSetCoins = () => {
    if (coins) {
      const amount = isCopperPieces ? coins : coins * 10
      setCopperPieces(amount)
      setCoins(0)
      setIsCopperPieces(false)
      onClose()
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
      handleSetCoins()
    }
  }

  useEffect(() => {
    setCoins(copperPieces.get() / 10)
  }, [copperPieces])

  return (
    <>
      <h5
        id='drawer-label--set-coins'
        className='ph-color-accent mb-6 inline-flex items-center text-2xl'
      >
        {t('Set coins')}
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
        <label
          htmlFor='set-coins'
          className='mb-2 block font-medium text-gray-700'
        >
          {t('Enter coin amount. Use copper pieces instead of float numbers.')}
        </label>
        <div className='relative'>
          <input
            autoFocus
            type='number'
            name='set-coins'
            id='set-coins'
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
            id='copper-coins--set-coins'
            type='checkbox'
            value=''
            className='h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
          />
          <label
            htmlFor='copper-coins--set-coins'
            className='ms-2 cursor-pointer text-sm font-medium text-gray-900'
          >
            {t('Copper pieces')}
          </label>
        </div>

        <div className='bottom-0 left-0 flex w-full justify-center space-x-4 pb-4 md:absolute md:px-4'>
          <button
            onClick={handleSetCoins}
            type='button'
            className='ph-btn-primary w-full justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
          >
            {t('Set')}
          </button>
        </div>
      </div>
    </>
  )
}

export default SetCoinsFragment
