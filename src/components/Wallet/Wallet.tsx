import { XCircleIcon as RemoveCoinsIcon } from '@heroicons/react/24/solid'
import { t, Trans } from '@lingui/macro'
import React, { useState } from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import Drawer from '@/components/Drawer/Drawer'
import SetCoinsFragment from '@/components/Inventory/SetCoinsFragment/SetCoinsFragment'
import Toggle from '@/components/Toggle/Toggle'
import {
  resetCurrencies,
  toggleCoinsWeightActive,
  useInventoryState,
} from '@/state/InventoryState'

const Wallet = () => {
  const [isManaged, setIsManaged] = useState(false)
  const [isSetCoinsDrawerOpen, setSetCoinsDrawerOpen] = useState(false)

  // FIXME doesnt affect displayed encumbrance
  const {
    state: { wallet, isCoinWeightActive },
  } = useInventoryState()

  return (
    <div className='px-0'>
      {/* 1st row */}
      <div className='my-4 flex items-center space-x-2 sm:mb-2 sm:mt-0'>
        <CostFragment
          wallet={wallet.get()}
          onClick={() => setSetCoinsDrawerOpen(true)}
        />
        <button
          onClick={resetCurrencies}
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
        {/* TODO enable this toggle */}
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
        <Toggle
          checked={isCoinWeightActive.get()}
          onChange={toggleCoinsWeightActive}
          title={t`Enable the weight of coins for encumbrance calculations.`}
        >
          <Trans>Include the weight</Trans>
        </Toggle>
      </>
    </div>
  )
}

export default Wallet
