import type { MessageDescriptor } from '@lingui/core'

import type { EquipmentCategoryKey } from '@/state/InventoryState'

export type EquipmentItemTranslated<T> = {
  name: MessageDescriptor
  details?: MessageDescriptor
  categoryKey?: EquipmentCategoryKey // FIXME it is not optional
} & Omit<T, 'name' | 'details'>
