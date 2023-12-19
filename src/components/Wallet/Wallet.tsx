import { XCircleIcon as RemoveCoinsIcon } from '@heroicons/react/24/solid'
import { t, Trans } from '@lingui/macro'
import React, { useState } from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import Drawer from '@/components/Drawer/Drawer'
import SetCoinsFragment from '@/components/Inventory/SetCoinsFragment/SetCoinsFragment'
import {
  setCopperPieces,
  toggleCoinsWeightActive,
  useInventoryState,
} from '@/state/InventoryState'

const Wallet = () => {
  const [isManaged, setIsManaged] = useState(false)
  const [isSetCoinsDrawerOpen, setSetCoinsDrawerOpen] = useState(false)

  const { state } = useInventoryState()
  const { copperPieces, isCoinWeightActive } = state

  return (
    <div className='px-0'>
      {/* 1st row */}
      <div className='my-4 flex items-center space-x-2 sm:mb-2 sm:mt-0'>
        <CostFragment
          cost={copperPieces.get() ?? 0}
          onClick={() => setSetCoinsDrawerOpen(true)}
          copperPieces
        />
        <button
          onClick={() => setCopperPieces(0)}
          title={t`Reset coins`}
          className='cursor-pointer flex-col items-center justify-center rounded p-2 text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-900 lg:p-1'
        >
          <RemoveCoinsIcon className='me-auto h-5 w-5' />
        </button>
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
        <label className='relative inline-flex hidden cursor-pointer items-center'>
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
            title={t`Enable automatic subtraction of money when equipment items are added`}
          >
            <Trans>Manage</Trans>
          </span>
        </label>
        <label className='relative inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            checked={isCoinWeightActive.get()}
            className='peer sr-only'
            onChange={() => toggleCoinsWeightActive()}
          />
          <div className="peer h-6	w-11 scale-90 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300"></div>
          <span
            className='ms-2'
            title={t`Enable the weight of coins for encumbrance calculations.`}
          >
            <Trans>Include the weight</Trans>
          </span>
        </label>
      </>
    </div>
  )
}

export default Wallet
