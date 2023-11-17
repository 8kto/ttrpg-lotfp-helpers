import React from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import {
  getEncumbrance,
  getTotal,
} from '@/components/EncumbranceFragment/helpers'
import MovementFragment from '@/components/MovementFragment/MovementFragment'
import { t } from '@/locale/helpers'
import { combineEquipment } from '@/state/helpers'
import { useInventoryState } from '@/state/InventoryState'

const InventoryDetails = () => {
  const { state: equipmentState } = useInventoryState()
  const { totalPoints, totalCost } = getTotal(combineEquipment(equipmentState))
  const encumbrance = getEncumbrance(totalPoints)

  const titleClassname = 'ph-font-cursive text-red-900 text-lg'

  return (
    <div className='mt-6 border-t border-gray-100 text-base'>
      <dl className='divide-y divide-gray-100'>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className={titleClassname}>{t('Total')}</dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <CostFragment cost={totalCost} />
          </dd>
        </div>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className={titleClassname}>{t('Encumbrance')}</dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            {encumbrance} ({totalPoints.toPrecision(2)})
          </dd>
        </div>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className={titleClassname}>{t('Movement')}</dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <MovementFragment encumbrance={encumbrance} />
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default InventoryDetails
