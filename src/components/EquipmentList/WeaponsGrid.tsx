import { useHookstate } from '@hookstate/core'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import type { DataGridColumn } from '@/components/DataGrid/DataGrid'
import DataGrid from '@/components/DataGrid/DataGrid'
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
  const equipmentState = useHookstate(EquipmentState)
  const handleCheckboxChange = (item: WeaponEntry) => {
    const isAdded = equipmentState.weapons
      .get()
      .some((i) => item.name === i.name)

    if (isAdded) {
      equipmentState.weapons.set((a) => a.filter((i) => item.name !== i.name))
    } else {
      equipmentState.weapons.set((a) => a.concat(item))
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
