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
import type { MissileWeaponItem } from '@/domain/weapon'
import { useInventoryState } from '@/state/InventoryState'

type MissileWeaponInventoryItem = InventoryItem<MissileWeaponItem>

const columns: ReadonlyArray<DataGridColumn<MissileWeaponInventoryItem>> = [
  {
    className: 'w-1/2 sm:w-1/3',
    key: 'name',
    shouldRenderDetails: (item) => !!item.details || !!item.range,
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
      <DamageFragment damage={(item as MissileWeaponItem).damage} />
    ),
    get title() {
      return t`Damage`
    },
  },
]

const MissileWeaponsInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { missileWeapons } = equipmentState

  return (
    <DataGrid<MissileWeaponInventoryItem>
      data={missileWeapons.get()}
      columns={columns}
      onRemoveClick={handleRemoveEquipmentItemClick}
      spanDetails={columns.length}
      initialSortState={{
        key: '' as keyof MissileWeaponItem,
        direction: 'asc',
      }}
      noFilter
    />
  )
}

export default MissileWeaponsInventoryGrid
