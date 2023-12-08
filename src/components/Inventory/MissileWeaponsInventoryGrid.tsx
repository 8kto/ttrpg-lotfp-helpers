import { t } from '@lingui/macro'
import React from 'react'

import { renderNameGridCol } from '@/components/EquipmentList/gridHelpers'
import { renderWeightInventoryCol } from '@/components/Inventory/helpers'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import type { InventoryColumn } from '@/components/Inventory/types'
import type { InventoryItem } from '@/domain'
import type { MissileWeaponItem } from '@/domain/weapon'
import { removeMissileWeapon, useInventoryState } from '@/state/InventoryState'

type MissileWeaponInventoryItem = InventoryItem<MissileWeaponItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<MissileWeaponInventoryItem>
> = [
  {
    className: 'w-1/2 sm:w-1/3',
    key: 'name',
    render: renderNameGridCol,
    get title() {
      return t`Name`
    },
  },
  {
    className: 'w-1/6',
    key: 'lockedCost',
    get title() {
      return t`Cost`
    },
  },
  {
    className: 'hidden sm:table-cell sm:w-1/6 text-sm',
    key: 'points',
    render: renderWeightInventoryCol,
    get title() {
      return t`Weight`
    },
  },
]

const MissileWeaponsInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { missileWeapons } = equipmentState

  const onRemoveClick = (item: InventoryItem<MissileWeaponItem>) =>
    removeMissileWeapon(item)

  return (
    <InventoryGrid<MissileWeaponInventoryItem>
      data={missileWeapons.get()}
      columns={inventoryTableColumns}
      onRemoveClick={onRemoveClick}
    />
  )
}

export default MissileWeaponsInventoryGrid
