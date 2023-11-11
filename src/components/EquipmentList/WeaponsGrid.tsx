import { none, useHookstate } from '@hookstate/core'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import type { DataGridColumn } from '@/components/DataGrid/DataGrid'
import DataGrid from '@/components/DataGrid/DataGrid'
import { Equipment } from '@/config/Equipment'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { WeaponEntry } from '@/domain/weapon'
import { InventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<WeaponEntry>> = [
  {
    key: 'name',
    title: 'Name',
  },
  // {
  //   key: 'type',
  //   title: 'Type',
  //   render: (item: WeaponEntry) => <span>{ArmorType[item.type]}</span>,
  // },
  {
    key: 'cityCost',
    title: 'City Cost',
  },
  {
    key: 'ruralCost',
    title: 'Rural Cost',
  },
  {
    key: 'damage',
    render: (item: WeaponEntry) => <DamageFragment damage={item.damage} />,
    title: 'Damage',
  },
  {
    key: 'points',
    render: (item: WeaponEntry) => <span>{EncumbrancePoint[item.points]}</span>,
    title: 'Points',
  },
]

const WeaponsGrid = () => {
  const equipmentState = useHookstate(InventoryState)
  const handleCheckboxChange = (item: WeaponEntry) => {
    const index = equipmentState.weapons
      .get()
      .findIndex((i) => item.name === i.name)

    if (index === -1) {
      equipmentState.weapons.merge([item])
    } else {
      equipmentState.weapons[index].set(none)
    }
  }

  const filterName = (item: WeaponEntry, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  const isChecked = (item: WeaponEntry) => {
    return equipmentState.weapons.get().some((i) => item.name === i.name)
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
