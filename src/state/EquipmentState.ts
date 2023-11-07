import { hookstate } from '@hookstate/core'

import {EquipmentItem} from "@/shared/types"

type EquipmentStateType = {
  items: Record<string, EquipmentItem>
}

export const EquipmentState = hookstate<EquipmentStateType>({
  items: {},
})
