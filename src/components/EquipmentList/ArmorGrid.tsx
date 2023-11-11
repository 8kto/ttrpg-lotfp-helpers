import { none, useHookstate } from '@hookstate/core'
import React, { useMemo } from 'react'

import type { DataGridColumn } from '@/components/DataGrid/DataGrid'
import DataGrid from '@/components/DataGrid/DataGrid'
import { Equipment } from '@/config/Equipment'
import type { ArmorEntry } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { InventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<ArmorEntry>> = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'type',
    render: (item: ArmorEntry) => <span>{ArmorType[item.type]}</span>,
    title: 'Type',
  },
  {
    key: 'armorClass',
    title: 'AC',
  },
  {
    key: 'points',
    render: (item: ArmorEntry) => <span>{EncumbrancePoint[item.points]}</span>,
    title: 'Weight',
  },
]

const cityCostColumn: DataGridColumn<ArmorEntry> = {
  key: 'cityCost',
  title: 'City Cost',
}
const ruralCostColumn: DataGridColumn<ArmorEntry> = {
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

  const handleCheckboxChange = (item: ArmorEntry) => {
    const index = armor.get().findIndex((i) => item.name === i.name)

    if (index === -1) {
      armor.merge([item])
    } else {
      armor[index].set(none)
    }
  }

  const filterName = (item: ArmorEntry, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  const isChecked = (item: ArmorEntry) => {
    return armor.get().some((i) => item.name === i.name)
  }

  return (
    <DataGrid<ArmorEntry>
      data={dataFilteredByCost}
      columns={columnsFilteredByCost}
      onCheckboxChange={handleCheckboxChange}
      filterFn={filterName}
      isCheckedFn={isChecked}
      filterPlaceholder={'Filter by name'}
    />
  )
}

// TODO sort numericals (AC, cost...)
// TODO checkbox isRecorded
export default ArmorGrid
