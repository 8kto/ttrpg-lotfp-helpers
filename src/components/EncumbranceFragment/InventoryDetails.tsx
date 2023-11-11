import { useHookstate } from '@hookstate/core'
import React from 'react'

import {
  getEncumbrance,
  getTotal,
} from '@/components/EncumbranceFragment/helpers'
import MovementFragment from '@/components/MovementFragment/MovementFragment'
import { combineEquipment } from '@/state/helpers'
import { InventoryState } from '@/state/InventoryState'

const InventoryDetails = () => {
  const equipmentState = useHookstate(InventoryState)

  const { totalPoints, totalCost } = getTotal(combineEquipment(equipmentState))
  const encumbrance = getEncumbrance(totalPoints)

  return (
    <div className='mt-6 border-t border-gray-100'>
      <dl className='divide-y divide-gray-100'>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className='text-sm font-medium leading-6 text-gray-900'>Total</dt>
          <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <strong>{totalCost}</strong> sp
          </dd>
        </div>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className='text-sm font-medium leading-6 text-gray-900'>
            Encumbrance
          </dt>
          <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            {encumbrance} ({totalPoints.toPrecision(2)})
          </dd>
        </div>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className='text-sm font-medium leading-6 text-gray-900'>
            Movement
          </dt>
          <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <MovementFragment encumbrance={encumbrance} />
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default InventoryDetails
