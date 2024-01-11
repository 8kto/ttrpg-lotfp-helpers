import type { SortConfig } from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'

type SortResult = 1 | -1 | 0

export const trivialSort =
  <T extends EquipmentItem>(sortConfig: SortConfig<T>) =>
  (a: T, b: T): SortResult => {
    if (!sortConfig.key) {
      return 0
    }

    const valueA = a[sortConfig.key]
    const valueB = b[sortConfig.key]

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return (
        sortConfig.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
      ) as SortResult
    }

    if (valueA < valueB) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (valueA > valueB) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }

    return 0
  }

export type DataGridSortFunction = typeof trivialSort
