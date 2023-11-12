import { useHookstate } from '@hookstate/core'
import React, { useMemo } from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import { Equipment } from '@/config/Equipment'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { WeaponEntry } from '@/domain/weapon'
import {autoincrement} from "@/shared/helpers/autoincrement"
import deepclone from '@/shared/helpers/deepclone'
import { InventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<WeaponEntry>> = [
  {
    className: 'w-1/3 truncate',
    key: 'name',
    title: 'Name',
  },
  {
    className: 'w-1/6',
    key: 'damage',
    render: (item: WeaponEntry) => <DamageFragment damage={item.damage} />,
    title: 'Damage',
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: (item: WeaponEntry) => <span>{EncumbrancePoint[item.points]}</span>,
    title: 'Weight',
  },
]

const cityCostColumn: DataGridColumn<WeaponEntry> = {
  className: 'w-1/6',
  key: 'cityCost',
  title: 'City Cost',
}
const ruralCostColumn: DataGridColumn<WeaponEntry> = {
  className: 'w-1/6',
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
    const data = Object.values(Equipment.MeleeWeapons)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [isCostRural])
  
  const autoinc = useMemo(() => {
    return autoincrement()
  }, [])

  const handleAddClick = (item: WeaponEntry) => {
    const clone = deepclone(item)
    // Workaround to drop cost variant in inventory
    // FIXME use lockedPrice prop, don't remove anything from the VO
    if (isCostRural.get()) {
      delete clone[isCostRural ? 'cityCost' : 'ruralCost']
    }

    clone.inventoryId = autoinc.next().value
    weapons[weapons.length].set(clone)
  }

  const filterName = (item: WeaponEntry, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  return (
    <DataGrid<WeaponEntry>
      data={dataFilteredByCost}
      columns={columnsFilteredByCost}
      onAddClick={handleAddClick}
      filterFn={filterName}
      filterPlaceholder={'Filter by name'}
    />
  )
}

// TODO sort damage
export default WeaponsGrid
