import { none, useHookstate } from '@hookstate/core'
import React from 'react'

import DamageLabel from '@/components/DamageLabel'
import type { DataGridColumn } from '@/components/Grid/DataGrid'
import DataGrid from '@/components/Grid/DataGrid'
import { Equipment } from '@/config/Equipment'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { WeaponEntry } from '@/domain/weapon'
import { EquipmentState } from '@/state/EquipmentState'

const columns: ReadonlyArray<DataGridColumn<WeaponEntry>> = [
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
  {
    key: 'damage',
    render: (item: WeaponEntry) => <DamageLabel damage={item.damage} />,
    title: 'Damage',
  },
  {
    key: 'points',
    render: (item: WeaponEntry) => <span>{EncumbrancePoint[item.points]}</span>,
    title: 'Points',
  },
]

const WeaponsGrid = () => {
  const equipmentState = useHookstate(EquipmentState)
  const handleCheckboxChange = (id: number) => {
    const currentItem = equipmentState.weapons[id].get()

    if (currentItem) {
      equipmentState.weapons[id].set(none)
    } else {
      const newItem = Equipment.Weapons[id]
      if (newItem) {
        equipmentState.weapons[id].set(newItem)
      }
    }
  }

  const filterName = (item: WeaponEntry, filter: string) => {
    return item.name.toLowerCase().includes(filter.toLowerCase())
  }

  const isChecked = (item: WeaponEntry) => {
    return !!equipmentState.weapons.get()[item.id]
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
