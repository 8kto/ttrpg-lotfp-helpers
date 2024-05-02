import { t } from '@lingui/macro'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import {
  renderInventoryDetailsBody,
  renderInventoryTitle,
} from '@/components/EquipmentList/gridHelpers'
import { handleRemoveEquipmentItemClick } from '@/components/EquipmentList/helpers'
import type { InventoryItem } from '@/domain/inventory'
import type { FirearmWeaponItem } from '@/domain/weapon'
import { useInventoryState } from '@/state/InventoryState'

type FirearmWeaponInventoryItem = InventoryItem<FirearmWeaponItem>

const columns: ReadonlyArray<DataGridColumn<FirearmWeaponInventoryItem>> = [
  {
    className: 'w-1/2 sm:w-1/3',
    key: 'name',
    shouldRenderDetails: (item) => !!item.details,
    render: renderInventoryTitle,
    renderDetails: renderInventoryDetailsBody,
    get title() {
      return t`Name`
    },
  },
  {
    className: 'w-1/6',
    key: 'damage',
    render: (item) => (
      <DamageFragment damage={(item as FirearmWeaponItem).damage} />
    ),
    get title() {
      return t`Damage`
    },
  },
]

const FirearmWeaponsInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { firearmWeapons } = equipmentState

  return (
    <DataGrid<FirearmWeaponInventoryItem>
      data={firearmWeapons.get()}
      columns={columns}
      onRemoveClick={handleRemoveEquipmentItemClick}
      spanDetails={columns.length}
      initialSortState={{
        key: '' as keyof FirearmWeaponInventoryItem,
        direction: 'asc',
      }}
      noFilter
    />
  )
}

export default FirearmWeaponsInventoryGrid
