import type { EquipmentStateType } from '@/state/EquipmentState'
import { EquipmentStateKeys } from '@/state/EquipmentState'
import type { State } from '@hookstate/core'

export const combineEquipment = (equipment: State<EquipmentStateType>) => {
  return EquipmentStateKeys.flatMap((key) =>
    Object.values(equipment.nested(key).get()),
  )
}
