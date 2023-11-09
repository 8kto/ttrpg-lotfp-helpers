import React from 'react'
import { useHookstate } from '@hookstate/core'
import { EquipmentState } from '@/state/EquipmentState'
import { getEncumbrance } from '@/components/EncumbranceBadge/helpers'
import { combineEquipment } from '@/state/helpers'

const EncumbranceBadge = () => {
  const equipmentState = useHookstate(EquipmentState)

  const { totalPoints, totalCost } = combineEquipment(equipmentState).reduce(
    (totals, item) => {
      return {
        totalPoints: totals.totalPoints + (item.isRecorded ? item.points : 0),
        totalCost: totals.totalCost + (item.cityCost || 0), // Assuming cityCost can be null/undefined
      }
    },
    { totalPoints: 0, totalCost: 0 },
  )

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
