import type { EquipmentCategoryKey } from '@/state/InventoryState'

/**
 * @deprecated
 */
export type EquipmentItemTranslated<T> = {
  name: string
  details?: string
  categoryKey?: EquipmentCategoryKey // FIXME it is not optional
} & Omit<T, 'name' | 'details'>
