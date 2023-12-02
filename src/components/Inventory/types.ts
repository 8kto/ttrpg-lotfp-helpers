import type { I18n } from '@lingui/core'
import type React from 'react'

import type { EquipmentItem, InventoryItem } from '@/domain'

export interface InventoryColumn<T extends InventoryItem<EquipmentItem>> {
  key: keyof T
  title: string
  className?: string
  render?: (item: T, i18n: I18n) => React.ReactNode
}
