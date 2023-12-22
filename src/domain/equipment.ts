import type { CurrencyType } from '@/domain/currency'
import type { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentCategoryKey } from '@/state/InventoryState'

export interface EquipmentItem {
  name: string
  categoryKey: EquipmentCategoryKey
  cityCostCp: number
  ruralCostCp: number | null
  points: EncumbranceUnit
  details?: string | null
}

export type EquipmentItemDto = {
  name: string
  cost?: number
  currencyType: CurrencyType
  category: EquipmentCategoryKey
  points: EncumbranceUnit
  details: string | null
}

type EquipmentPackItem = [/*name*/ string, /*qty*/ number]

export type EquipmentPack = {
  name: string
  items: ReadonlyArray<EquipmentPackItem>
}
