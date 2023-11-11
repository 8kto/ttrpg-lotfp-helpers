import type { State } from '@hookstate/core'

import type { InventoryStateType } from '@/state/InventoryState'
import { EquipmentStateKeys } from '@/state/InventoryState'

export const combineEquipment = (equipment: State<InventoryStateType>) => {
  return EquipmentStateKeys.flatMap((key) =>
    Object.values(equipment.nested(key).get()),
  )
}
