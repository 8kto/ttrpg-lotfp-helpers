import React, { useMemo } from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import { getInventoryItem } from '@/components/EquipmentList/helpers'
import { Equipment } from '@/config/Equipment'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MissileWeaponItem } from '@/domain/weapon'
import { t } from '@/locale/helpers'
import { addMissileWeapon, useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<MissileWeaponItem>> = [
  {
    className: 'w-1/3 truncate',
    key: 'name',
    title: 'Name',
  },
  {
    className: 'w-1/6',
    key: 'damage',
    render: (item: MissileWeaponItem) => (
      <DamageFragment damage={item.damage} />
    ),
    title: 'Damage',
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: (item: MissileWeaponItem) => (
      <span>{EncumbrancePoint[item.points]}</span>
    ),
    title: 'Weight',
  },
]

const cityCostColumn: DataGridColumn<MissileWeaponItem> = {
  className: 'w-1/6',
  key: 'cityCost',
  title: 'City Cost',
}
const ruralCostColumn: DataGridColumn<MissileWeaponItem> = {
  className: 'w-1/6',
  key: 'ruralCost',
  title: 'Rural Cost',
}

const MissileWeaponsGrid = () => {
  const {
    state: { isCostRural },
  } = useInventoryState()

  const columnsFilteredByCost = useMemo(() => {
    return isCostRural.get()
      ? [...columns, ruralCostColumn]
      : [...columns, cityCostColumn]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(Equipment.MissileWeapons)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [isCostRural])

  const handleAddClick = (item: MissileWeaponItem) => {
    const clone = getInventoryItem(
      item,
      (isCostRural.get() ? item.ruralCost : item.cityCost)!,
    )
    addMissileWeapon(clone)
  }

  const filterName = (item: MissileWeaponItem, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  return (
    <DataGrid<MissileWeaponItem>
      data={dataFilteredByCost}
      columns={columnsFilteredByCost}
      onAddClick={handleAddClick}
      filterFn={filterName}
      filterPlaceholder={t('Filter by name')}
    />
  )
}

// TODO sort damage
export default MissileWeaponsGrid
