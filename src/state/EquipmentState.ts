import { hookstate } from '@hookstate/core'

import {EquipmentItem} from "@/shared/types"

type EquipmentState = {
  items: Record<string, EquipmentItem>
}

export const Equipment = hookstate<EquipmentState>({
  items: {},
})
