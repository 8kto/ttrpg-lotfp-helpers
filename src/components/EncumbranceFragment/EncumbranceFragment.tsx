import { useHookstate } from '@hookstate/core'
import React from 'react'

import {
  getEncumbrance,
  getTotal,
} from '@/components/EncumbranceFragment/helpers'
import MovementFragment from '@/components/MovementFragment/MovementFragment'
import { combineEquipment } from '@/state/helpers'
import { InventoryState } from '@/state/InventoryState'

const EncumbranceFragment = () => {
  const equipmentState = useHookstate(InventoryState)

  const { totalPoints, totalCost } = getTotal(combineEquipment(equipmentState))
  const encumbrance = getEncumbrance(totalPoints)
  return (
    <ul className='mb-4 list-disc space-y-3 pl-4 text-gray-500 dark:text-gray-400'>
      <li>Total: {totalCost} sp</li>
      <li>
        {encumbrance} ({totalPoints})
      </li>
      <li>
        <MovementFragment encumbrance={encumbrance} />
      </li>
    </ul>
  )
}

export default EncumbranceFragment
