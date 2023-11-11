import { none, useHookstate } from '@hookstate/core'
import React from 'react'

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
    key: 'cityCost',
    title: 'City Cost',
  },
  {
    key: 'ruralCost',
    title: 'Rural Cost',
  },
  {
    key: 'armorClass',
    title: 'AC',
  },
  {
    key: 'points',
    render: (item: ArmorEntry) => <span>{EncumbrancePoint[item.points]}</span>,
    title: 'Points',
  },
]

const ArmorGrid = () => {
  const equipmentState = useHookstate(InventoryState)

  const handleCheckboxChange = (item: ArmorEntry) => {
    const index = equipmentState.armor
      .get()
      .findIndex((i) => item.name === i.name)

    if (index === -1) {
      equipmentState.armor.merge([item])
    } else {
      equipmentState.armor[index].set(none)
    }
  }

  const filterName = (item: ArmorEntry, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  const isChecked = (item: ArmorEntry) => {
    return equipmentState.armor.get().some((i) => item.name === i.name)
  }

  return (
    <DataGrid<ArmorEntry>
      data={Object.values(Equipment.Armor)}
      columns={columns}
      onCheckboxChange={handleCheckboxChange}
      filterFn={filterName}
      isCheckedFn={isChecked}
      filterPlaceholder={'Filter by name'}
    />
  )
}

// TODO sort numericals (AC, cost...)
// TODO cost switcher
// TODO checkbox isRecorded
export default ArmorGrid
