import { useHookstate } from '@hookstate/core'
import React from 'react'

import {
  getEncumbrance,
  getTotal,
} from '@/components/EncumbranceFragment/helpers'
import MovementFragment from '@/components/MovementFragment/MovementFragment'
import { EquipmentState } from '@/state/EquipmentState'
import { combineEquipment } from '@/state/helpers'

const EncumbranceFragment = () => {
  const equipmentState = useHookstate(EquipmentState)

  const { totalPoints, totalCost } = getTotal(combineEquipment(equipmentState))
  const encumbrance = getEncumbrance(totalPoints)
  return (
    <ul className='mb-4 list-disc space-y-3 pl-4 text-gray-500 dark:text-gray-400'>
      <li>
        {encumbrance} ({totalPoints})
      </li>
      <li>Total: {totalCost} sp</li>
      <li>
        <MovementFragment encumbrance={encumbrance} />
      </li>
    </ul>
  )
}

export default EncumbranceFragment
