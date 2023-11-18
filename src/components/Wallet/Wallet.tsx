import React, { useState } from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import { t } from '@/locale/helpers'
import { useInventoryState } from '@/state/InventoryState'

const Wallet = () => {
  const [isManaged, setIsManaged] = useState(false)
  const { state } = useInventoryState()
  const { balanceCopperPieces } = state

  const handleSwitchClick = () => {
    setIsManaged((v) => !v)
  }

  return (
    <div className='flex items-center'>
      <span className='mr-1'>
        <CostFragment
          cost={balanceCopperPieces.get() ? balanceCopperPieces.get() / 10 : 0}
        />
      </span>
      <label className='relative inline-flex cursor-pointer items-center'>
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
