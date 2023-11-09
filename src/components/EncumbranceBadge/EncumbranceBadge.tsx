import { useHookstate } from '@hookstate/core'
import React from 'react'

import {getEncumbrance, getTotal} from '@/components/EncumbranceBadge/helpers'
import { EquipmentState } from '@/state/EquipmentState'
import { combineEquipment } from '@/state/helpers'

const EncumbranceBadge = () => {
  const equipmentState = useHookstate(EquipmentState)

  const { totalPoints, totalCost } = getTotal(combineEquipment(equipmentState))

  return (
    <ul className='mb-4 list-disc space-y-3 pl-4 text-gray-500 dark:text-gray-400'>
      <li>
        {getEncumbrance(totalPoints)} ({totalPoints})
      </li>
      <li>Total: {totalCost} sp</li>
    </ul>
  )
}

export default EncumbranceBadge
