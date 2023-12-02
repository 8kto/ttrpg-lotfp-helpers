import type { I18n } from '@lingui/core'
import type React from 'react'

import type { EquipmentItem } from '@/domain'

export interface DataGridColumn<T extends EquipmentItem> {
  key: keyof T
  title: string
  className?: string
  render?: (item: T, i18n: I18n) => React.ReactNode
}

export type SortOrder = 'asc' | 'desc'
export type SortConfig<T extends EquipmentItem> = {
  key: keyof T
  direction: SortOrder
}

export interface DataGridProps<T extends EquipmentItem> {
  data: ReadonlyArray<T>
  columns: ReadonlyArray<DataGridColumn<T>>
  initialSortState?: SortConfig<T>
  onAddClick: (item: T) => void
  onSortChange?: (key: keyof T, direction: SortOrder) => void
  handleSort?: <T extends EquipmentItem>(
    sortConfig: SortConfig<T>,
  ) => (a: T, b: T) => 1 | -1 | 0
  filterFn: (item: T, filter: string) => boolean
  filterPlaceholder?: string
}
