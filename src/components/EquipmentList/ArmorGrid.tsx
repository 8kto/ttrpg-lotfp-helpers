import React from 'react'

import { Equipment } from '@/shared/config/Equipment'
import DataGrid from '@/components/Grid/DataGrid'
import { useHookstate, none } from '@hookstate/core'
import { EquipmentState } from '@/state/EquipmentState'
import type { ArmorEntry } from '@/shared/types/armor'
import { ArmorType } from '@/shared/types/armor'
import { EncumbrancePoint } from '@/shared/types/encumbrance'

const columns = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'type',
    title: 'Type',
    render: (item: ArmorEntry) => <span>{ArmorType[item.type]}</span>,
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
    title: 'Points',
    render: (item: ArmorEntry) => <span>{EncumbrancePoint[item.points]}</span>,
  },
]

const ArmorGrid = () => {
  const equipmentState = useHookstate(EquipmentState)
  const handleCheckboxChange = (id: number) => {
    const currentItem = equipmentState.armor[id].get()

    if (currentItem) {
      equipmentState.armor[id].set(none)
    } else {
      const newItem = Equipment.Armor[id]
      if (newItem) {
        equipmentState.armor[id].set(newItem)
      }
    }
  }

  const filterName = (item: ArmorEntry, filter: string) => {
    return item.name.toLowerCase().includes(filter.toLowerCase())
  }

  const isChecked = (item: ArmorEntry) => {
    return !!equipmentState.armor.get()[item.id]
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
