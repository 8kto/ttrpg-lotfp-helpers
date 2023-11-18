import React from 'react'

import type { InventoryColumn } from '@/components/Inventory/InventoryGrid'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import ItemDetails from '@/components/Inventory/ItemDetails'
import type { InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MissileWeaponItem } from '@/domain/weapon'
import { removeMissileWeapon, useInventoryState } from '@/state/InventoryState'

type MissileWeaponInventoryItem = InventoryItem<MissileWeaponItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<MissileWeaponInventoryItem>
> = [
  {
    className: 'w-1/2',
    key: 'name',
    render: (item: MissileWeaponInventoryItem) => (
      <ItemDetails<MissileWeaponInventoryItem> item={item} />
    ),
    title: 'Name',
  },
  {
    className: 'w-1/6',
    key: 'lockedCost',
    title: 'Cost',
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: (item) => {
      return EncumbrancePoint[item.points]
    },
    title: 'Weight',
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
