import { useHookstate } from '@hookstate/core'
import React, { useMemo } from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import { trivialSort } from '@/components/DataGrid/helpers'
import type { DataGridColumn, SortConfig } from '@/components/DataGrid/types'
import { Equipment } from '@/config/Equipment'
import type { EquipmentItem } from '@/domain'
import type { ArmorEntry } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import deepclone from '@/shared/helpers/deepclone'
import { InventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<ArmorEntry>> = [
  {
    className: 'w-1/2',
    key: 'name',
    title: 'Name',
  },
  {
    className: 'w-1/6',
    key: 'armorClass',
    title: 'AC',
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: (item: ArmorEntry) => <span>{EncumbrancePoint[item.points]}</span>,
    title: 'Weight',
  },
]

const cityCostColumn: DataGridColumn<ArmorEntry> = {
  className: 'w-1/6',
  key: 'cityCost',
  title: 'City Cost',
}
const ruralCostColumn: DataGridColumn<ArmorEntry> = {
  className: 'w-1/6',
  key: 'ruralCost',
  title: 'Rural Cost',
}

const ArmorGrid = () => {
  const { armor, isCostRural } = useHookstate(InventoryState)

  const columnsFilteredByCost = useMemo(() => {
    return isCostRural.get()
      ? [...columns, ruralCostColumn]
      : [...columns, cityCostColumn]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(Equipment.Armor)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [isCostRural])

  const handleAddClick = (item: ArmorEntry) => {
    const clone = deepclone(item)
    // Workaround to drop cost variant in inventory
    if (isCostRural.get()) {
      delete clone[isCostRural ? 'cityCost' : 'ruralCost']
    }

    armor[armor.length].set(clone)
  }

  const filterName = (item: ArmorEntry, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  const handleSort =
    (sortConfig: SortConfig<EquipmentItem>) =>
    (a: ArmorEntry, b: ArmorEntry): 1 | -1 | 0 => {
      const isSpecialSort = (value: number | string) =>
        typeof value === 'string' &&
        value.startsWith('+') &&
        (sortConfig as SortConfig<ArmorEntry>).key === 'armorClass'

      // NB Extra logic just for a Shield, worth introducing an ArmorClass type?
      if (isSpecialSort(a.armorClass) || isSpecialSort(b.armorClass)) {
        if (a.armorClass === b.armorClass) {
          return 0
        }
        if (isSpecialSort(a.armorClass)) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (isSpecialSort(b.armorClass)) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
      }

      // Fallback to the trivialSort function for other cases
      return trivialSort(sortConfig)(a, b)
    }

  return (
    <DataGrid<ArmorEntry>
      data={dataFilteredByCost}
      columns={columnsFilteredByCost}
      onAddClick={handleAddClick}
      filterFn={filterName}
      filterPlaceholder={'Filter by name'}
      handleSort={handleSort as typeof trivialSort}
    />
  )
}

export default ArmorGrid
