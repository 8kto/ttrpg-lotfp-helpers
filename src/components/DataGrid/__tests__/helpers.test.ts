import { trivialSort } from '@/components/DataGrid/helpers'
import type { SortConfig } from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'

describe('DataGrid helpers', () => {
  describe('trivialSort', () => {
    const mockEquipmentItems = [
      { cityCostCp: 10, name: 'Item A' },
      { cityCostCp: 20, name: 'Item B' },
      { cityCostCp: 15, name: 'Item C' },
    ] as Array<EquipmentItem>

    it('sorts ascending correctly by a given key', () => {
      const sortConfig: SortConfig<EquipmentItem> = {
        direction: 'asc',
        key: 'cityCostCp',
      }
      const sortedItems = [...mockEquipmentItems].sort(trivialSort(sortConfig))
      expect(sortedItems).toEqual([
        { cityCostCp: 10, name: 'Item A' },
        { cityCostCp: 15, name: 'Item C' },
        { cityCostCp: 20, name: 'Item B' },
      ])
    })

    it('sorts descending correctly by a given key', () => {
      const sortConfig: SortConfig<EquipmentItem> = {
        direction: 'desc',
        key: 'cityCostCp',
      }
      const sortedItems = [...mockEquipmentItems].sort(trivialSort(sortConfig))
      expect(sortedItems).toEqual([
        { cityCostCp: 20, name: 'Item B' },
        { cityCostCp: 15, name: 'Item C' },
        { cityCostCp: 10, name: 'Item A' },
      ])
    })

    it('returns items in original order when key is not specified', () => {
      const sortConfig: SortConfig<EquipmentItem> = {
        direction: 'asc',
        // @ts-ignore
        key: null,
      }
      const sortedItems = [...mockEquipmentItems].sort(trivialSort(sortConfig))
      expect(sortedItems).toEqual(mockEquipmentItems)
    })

    it('handles sorting by string values', () => {
      const sortConfig: SortConfig<EquipmentItem> = {
        direction: 'asc',
        key: 'name',
      }
      const sortedItems = [...mockEquipmentItems].sort(trivialSort(sortConfig))
      expect(sortedItems).toEqual([
        { cityCostCp: 10, name: 'Item A' },
        { cityCostCp: 20, name: 'Item B' },
        { cityCostCp: 15, name: 'Item C' },
      ])
    })
  })
})
