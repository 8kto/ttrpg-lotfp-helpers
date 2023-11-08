import React from 'react'

import {Equipment} from "@/shared/config/Equipment"
import DataGrid from "@/components/Grid/DataGrid"
import {useHookstate} from "@hookstate/core"
import {EquipmentState} from "@/state/EquipmentState"
import {WeaponEntry} from "@/shared/types/weapon"
import {EncumbrancePoint} from "@/shared/types/encumbrance"

const columns = [
  {
    key: 'name',
    title: 'Name',
  },
  // {
  //   key: 'type',
  //   title: 'Type',
  //   render: (item: ArmorEntry) => <span>{ArmorType[item.type]}</span>,
  // },
  {
    key: 'cityCost',
    title: 'City Cost',
  },
  {
    key: 'ruralCost',
    title: 'Rural Cost',
  },
  // {
  //   key: 'armorClass',
  //   title: 'AC',
  // },
  {
    key: 'points',
    title: 'Points',
    render: (item: WeaponEntry) => <span>{EncumbrancePoint[item.points]}</span>,
  },
]

const WeaponsGrid = () => {
  const equipmentState = useHookstate(EquipmentState)
  const handleCheckboxChange = (id: number) => {
    const item = Equipment.Armor[id]
    if (item) {
      equipmentState.items[id].set(item)
    }
  }

  const filterName = (item: WeaponEntry, filter: string) => {
    return item.name.toLowerCase().includes(filter.toLowerCase())
  }

  const isChecked = (item: WeaponEntry) => {
    return !!equipmentState.items.get()[item.id]
  }

  return (
    <DataGrid<WeaponEntry>
      data={Object.values(Equipment.Weapons)}
      columns={columns}
      onCheckboxChange={handleCheckboxChange}
      filterFn={filterName}
      isCheckedFn={isChecked}
      filterPlaceholder={'Filter by name'}
    />
  )
}

// TODO sort numericals (cost...)
// TODO sort damage
// TODO checkbox isRecorded
export default WeaponsGrid
