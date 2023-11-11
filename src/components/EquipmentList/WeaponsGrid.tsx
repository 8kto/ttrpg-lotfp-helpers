import { none, useHookstate } from '@hookstate/core'
import React, { useMemo } from 'react'

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
  {
    key: 'damage',
    render: (item: WeaponEntry) => <DamageFragment damage={item.damage} />,
    title: 'Damage',
  },
  {
    key: 'points',
    render: (item: WeaponEntry) => <span>{EncumbrancePoint[item.points]}</span>,
    title: 'Weight',
  },
]

const cityCostColumn: DataGridColumn<WeaponEntry> = {
  key: 'cityCost',
  title: 'City Cost',
}
const ruralCostColumn: DataGridColumn<WeaponEntry> = {
  key: 'ruralCost',
  title: 'Rural Cost',
}

const WeaponsGrid = () => {
  const { weapons, isCostRural } = useHookstate(InventoryState)

  const columnsFilteredByCost = useMemo(() => {
    return isCostRural.get()
      ? [...columns, ruralCostColumn]
      : [...columns, cityCostColumn]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(Equipment.Weapons)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [isCostRural])

  const handleCheckboxChange = (item: WeaponEntry) => {
    const index = weapons.get().findIndex((i) => item.name === i.name)

    if (index === -1) {
      weapons.merge([item])
    } else {
      weapons[index].set(none)
    }
  }

  const filterName = (item: WeaponEntry, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  const isChecked = (item: WeaponEntry) => {
    return weapons.get().some((i) => item.name === i.name)
  }

  return (
    <DataGrid<WeaponEntry>
      data={dataFilteredByCost}
      columns={columnsFilteredByCost}
      onCheckboxChange={handleCheckboxChange}
      filterFn={filterName}
      isCheckedFn={isChecked}
      filterPlaceholder={'Filter by name'}
    />
  )
}

// TODO sort damage
// TODO checkbox isRecorded
export default WeaponsGrid
