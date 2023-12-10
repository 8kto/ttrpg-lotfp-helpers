import type { MessageDescriptor } from '@lingui/core'

import type { EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentCategoryKey } from '@/state/InventoryState'

export interface EquipmentItem {
  name: string
  cityCost: number
  ruralCost: number | null
  points: EncumbrancePoint
  details?: string | null
}

export type EquipmentItemDto = {
  name: string
  cost?: number
  isCopper: boolean
  category: EquipmentCategoryKey
  points: EncumbrancePoint
  details: string | null
}

type EquipmentPackItem = [/*name*/ string, /*qty*/ number]

export type EquipmentPack = {
  name: MessageDescriptor
  items: Array<EquipmentPackItem>
}
