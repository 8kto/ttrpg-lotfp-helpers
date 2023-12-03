import type { SortConfig } from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain'

export const trivialSort =
  <T extends EquipmentItem>(sortConfig: SortConfig<T>) =>
  (a: T, b: T): 1 | -1 | 0 => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
    }

    return 0
  }

export type DataGridSortFunction = typeof trivialSort
