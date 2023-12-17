import { trivialSort } from '@/components/DataGrid/helpers'
import type { SortConfig } from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'

describe('DataGrid helpers', () => {
  describe('trivialSort', () => {
    const mockEquipmentItems = [
      { cityCost: 10, name: 'Item A' },
      { cityCost: 20, name: 'Item B' },
      { cityCost: 15, name: 'Item C' },
    ] as Array<EquipmentItem>

    it('sorts ascending correctly by a given key', () => {
      const sortConfig: SortConfig<EquipmentItem> = {
        direction: 'asc',
        key: 'cityCost',
      }
      const sortedItems = [...mockEquipmentItems].sort(trivialSort(sortConfig))
      expect(sortedItems).toEqual([
        { cityCost: 10, name: 'Item A' },
        { cityCost: 15, name: 'Item C' },
        { cityCost: 20, name: 'Item B' },
      ])
    })

    it('sorts descending correctly by a given key', () => {
      const sortConfig: SortConfig<EquipmentItem> = {
        direction: 'desc',
        key: 'cityCost',
      }
      const sortedItems = [...mockEquipmentItems].sort(trivialSort(sortConfig))
      expect(sortedItems).toEqual([
        { cityCost: 20, name: 'Item B' },
        { cityCost: 15, name: 'Item C' },
        { cityCost: 10, name: 'Item A' },
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
        { cityCost: 10, name: 'Item A' },
        { cityCost: 20, name: 'Item B' },
        { cityCost: 15, name: 'Item C' },
      ])
    })
  })
})
