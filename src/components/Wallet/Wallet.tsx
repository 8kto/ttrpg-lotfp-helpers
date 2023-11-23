import React, { useState } from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import Drawer from '@/components/Drawer/Drawer'
import SetCoinsFragment from '@/components/Inventory/SetCoinsFragment/SetCoinsFragment'
import { t } from '@/locale/helpers'
import { useInventoryState } from '@/state/InventoryState'

const Wallet = () => {
  const [isManaged, setIsManaged] = useState(false)
  const [isCoinWeightActive, setIsCoinWeightActive] = useState(true)
  const [isSetCoinsDrawerOpen, setSetCoinsDrawerOpen] = useState(false)

  const { state } = useInventoryState()
  const { copperPieces } = state

  return (
    <div className='px-4 sm:px-0'>
      {/* 1st row */}
      <div className='mb-2'>
        <CostFragment
          cost={copperPieces.get() ?? 0}
          onClick={() => {
            setSetCoinsDrawerOpen(true)
          }}
          copperPieces
        />
        <Drawer
          isOpen={isSetCoinsDrawerOpen}
          onClose={() => setSetCoinsDrawerOpen(false)}
          ariaLabelledBy={'drawer-label'}
        >
          <SetCoinsFragment onClose={() => setSetCoinsDrawerOpen(false)} />
        </Drawer>
      </div>
      {/* 2nd row */}
      <>
        <label className='relative inline-flex cursor-pointer items-center hidden'>
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
            checked={isCoinWeightActive}
            className='peer sr-only'
            onChange={() => {
              setIsCoinWeightActive((v) => !v)
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
