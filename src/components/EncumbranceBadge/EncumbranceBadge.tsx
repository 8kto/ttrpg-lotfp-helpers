import React from 'react'
import {useHookstate} from "@hookstate/core"
import {EquipmentState} from "@/state/EquipmentState"
import {getEncumbrance} from "@/components/EncumbranceBadge/helpers"
import {EquipmentItem} from "@/shared/types"

const EncumbranceBadge = () => {
  const equipmentState = useHookstate(EquipmentState)

  // TODO Costs fix
  let totalPoints: number = 0
  let totalCost: number = 0
  Object
    .values<EquipmentItem>(equipmentState.armor.get())
    .concat(Object.values(equipmentState.weapons.get()))
    .forEach((item) => {
      totalPoints += item.isRecorded ? item.points : 0
      totalCost += item.cityCost
    })
  
  return (
    <ul className="list-disc pl-4 mb-4 space-y-3 text-gray-500 dark:text-gray-400">
      <li>{getEncumbrance(totalPoints)} ({totalPoints})</li>
      <li>Total: {totalCost} sp</li>
    </ul>
  )
}

export default EncumbranceBadge