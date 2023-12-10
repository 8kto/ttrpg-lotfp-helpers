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

export enum Dice {
  d2 = 'd2',
  d3 = 'd3',
  d4 = 'd4',
  d6 = 'd6',
  d8 = 'd8',
  d10 = 'd10',
  d12 = 'd12',
  d20 = 'd20',
  d100 = 'd100',
}

export type InventoryItem<T extends EquipmentItem> = {
  [P in keyof T]: T[P]
} & {
  inventoryId: string
  lockedCost: number
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
