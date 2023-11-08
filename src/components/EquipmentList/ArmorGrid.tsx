import React from 'react'

import {Equipment} from "@/shared/config/equipment"
import DataGrid from "@/components/Grid/DataGrid"
import {useHookstate} from "@hookstate/core"
import {EquipmentState} from "@/state/EquipmentState"
import {ArmorEntry, ArmorType, EncumbrancePoint} from "@/shared/types"

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
    const item = Equipment.Armor[id]
    if (item) {
      equipmentState.items[id].set(item)
    }
  }

  const filterName = (item: ArmorEntry, filter: string) => {
    return item.name.toLowerCase().includes(filter.toLowerCase())
  }

  const isChecked = (item: ArmorEntry) => {
    return !!equipmentState.items.get()[item.id]
  }

  return (
    <DataGrid
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
