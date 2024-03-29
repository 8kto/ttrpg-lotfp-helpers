import type { State } from '@hookstate/core'
import type { I18n } from '@lingui/core'
import type React from 'react'

import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryStateType } from '@/state/InventoryState'

export interface DataGridColumn<T extends EquipmentItem> {
  key: keyof T
  title: string
  className?: string
  shouldRenderDetails?: (item: T) => boolean
  render?: (
    item: T,
    i18n: I18n,
    state: State<InventoryStateType, unknown>,
    isExpanded: boolean,
    shouldRenderDetails: boolean,
  ) => React.ReactNode
  renderDetails?: (
    item: T,
    i18n: I18n,
    state: State<InventoryStateType, unknown>,
  ) => React.ReactNode
}

export type SortOrder = 'asc' | 'desc'
export type SortConfig<T extends EquipmentItem> = {
  key: keyof T
  direction: SortOrder
}

export interface DataGridProps<T extends EquipmentItem> {
  data: ReadonlyArray<T>
  columns: ReadonlyArray<DataGridColumn<T>>
  spanDetails: number
  initialSortState?: SortConfig<T>
  onAddClick?: (item: T) => void
  onRemoveClick?: (item: T) => void
  handleSort?: <Type extends EquipmentItem>(
    sortConfig: SortConfig<Type>,
  ) => (a: Type, b: Type) => 1 | -1 | 0
  filterFn?: (item: T, filter: string) => boolean
  filterPlaceholder?: string
  noFilter?: boolean
}
