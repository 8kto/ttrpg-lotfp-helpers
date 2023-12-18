import type { EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentCategoryKey } from '@/state/InventoryState'

export interface EquipmentItem {
  name: string
  categoryKey: EquipmentCategoryKey
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
  name: string
  items: Array<EquipmentPackItem>
}
