import { CircleStackIcon } from '@heroicons/react/24/solid'
import React from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import {
  getEncumbrance,
  getTotal,
} from '@/components/EncumbranceFragment/helpers'
import MovementFragment from '@/components/MovementFragment/MovementFragment'
import Wallet from '@/components/Wallet/Wallet'
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
          <dt className={`${titleClassname} flex items-start`}>
            <div className='flex items-center'>
              <CircleStackIcon className='mr-2 h-5 w-5' />
              {t('Wallet')}
            </div>
          </dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <Wallet />
          </dd>
        </div>
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
          <dt className={titleClassname}>{t('Inventory cost')}</dt>
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
