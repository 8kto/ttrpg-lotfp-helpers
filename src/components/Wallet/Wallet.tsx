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
  toggleWalletIsManaged,
  useInventoryState,
} from '@/state/InventoryState'

const Wallet = () => {
  const [isSetCoinsDrawerOpen, setSetCoinsDrawerOpen] = useState(false)

  const {
    state: { wallet, isCoinWeightActive, isWalletManaged },
  } = useInventoryState()

  return (
    <div className='px-0'>
      {/* 1st row */}
      <div className='mt-1 flex items-center sm:mb-2 sm:mt-0'>
        <div className='text-lg'>
          <CostFragment
            wallet={wallet.get()}
            onClick={() => setSetCoinsDrawerOpen(true)}
          />
        </div>
        <button
          onClick={resetCurrencies}
          title={t`Reset coins`}
          className='cursor-pointer flex-col items-center justify-center rounded p-2 text-xs text-gray-300 hover:bg-gray-100 hover:text-gray-900 lg:p-1'
        >
          <RemoveCoinsIcon className='me-auto h-5 w-5' />
        </button>
        <Drawer
          open={isSetCoinsDrawerOpen}
          onClose={() => setSetCoinsDrawerOpen(false)}
          ariaLabelledBy={'drawer-label'}
        >
          <SetCoinsFragment onClose={() => setSetCoinsDrawerOpen(false)} />
        </Drawer>
      </div>
      {/* 2nd row */}
      <>
        <div className='block m-0'>
          <Toggle
            checked={isWalletManaged.get()}
            onChange={toggleWalletIsManaged}
            title={t`Enable automatic subtraction of money when equipment items are added`}
          >
            <Trans>Active</Trans>
          </Toggle>
        </div>
        <Toggle
          checked={isCoinWeightActive.get()}
          onChange={toggleCoinsWeightActive}
          title={t`Enable the weight of coins for encumbrance calculations.`}
        >
          <Trans>Coin weight</Trans>
        </Toggle>
      </>
    </div>
  )
}

export default Wallet
