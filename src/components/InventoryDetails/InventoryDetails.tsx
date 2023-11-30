import { CircleStackIcon } from '@heroicons/react/24/solid'
import { Trans } from '@lingui/macro'
import React from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import EncumbranceFragment from '@/components/EncumbranceFragment/EncumbranceFragment'
import { getTotal } from '@/components/InventoryDetails/helpers'
import MovementFragment from '@/components/MovementFragment/MovementFragment'
import Wallet from '@/components/Wallet/Wallet'
import { combineEquipment } from '@/state/helpers'
import { useInventoryState } from '@/state/InventoryState'

const InventoryDetails = () => {
  const { state: equipmentState } = useInventoryState()
  const { isCoinWeightActive, copperPieces } = equipmentState
  const { totalEncumbrancePoints, totalCost } = getTotal(
    combineEquipment(equipmentState),
    isCoinWeightActive ? copperPieces.get() : 0,
  )

  const titleClassname = 'ph-font-cursive text-red-900 text-lg'

  return (
    <div className='mt-6 border-t border-gray-100 text-base'>
      <dl className='divide-y divide-gray-100'>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className={`${titleClassname} flex`}>
            <CircleStackIcon className='mr-2 h-5 w-5' />
            <Trans>Wallet</Trans>
          </dt>
          <dd className='mt-1 flex items-center leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <Wallet />
          </dd>
        </div>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className={titleClassname}>
            <Trans>Inventory cost</Trans>
          </dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <CostFragment cost={totalCost} />
          </dd>
        </div>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className={titleClassname}>
            <Trans>Encumbrance</Trans>
          </dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <EncumbranceFragment encumbrancePoints={totalEncumbrancePoints} />
          </dd>
        </div>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className={titleClassname}>
            <Trans>Movement</Trans>
          </dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <MovementFragment encumbrancePoints={totalEncumbrancePoints} />
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default InventoryDetails
