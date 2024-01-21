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
import type { MeleeWeaponItem } from '@/domain/weapon'
import { useInventoryState } from '@/state/InventoryState'

type MeleeWeaponInventoryItem = InventoryItem<MeleeWeaponItem>

const columns: ReadonlyArray<DataGridColumn<MeleeWeaponInventoryItem>> = [
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
      <DamageFragment damage={(item as MeleeWeaponItem).damage} />
    ),
    get title() {
      return t`Damage`
    },
  },
]

const MeleeWeaponsInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { meleeWeapons } = equipmentState

  return (
    <DataGrid<MeleeWeaponInventoryItem>
      data={meleeWeapons.get()}
      columns={columns}
      onRemoveClick={handleRemoveEquipmentItemClick}
      spanDetails={columns.length}
      initialSortState={{
        key: '' as keyof MeleeWeaponInventoryItem,
        direction: 'asc',
      }}
      noFilter
    />
  )
}

export default MeleeWeaponsInventoryGrid
