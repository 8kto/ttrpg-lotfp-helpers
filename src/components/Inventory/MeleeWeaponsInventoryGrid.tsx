import { t } from '@lingui/macro'
import React from 'react'

import type { InventoryColumn } from '@/components/Inventory/InventoryGrid'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import ItemDetails from '@/components/Inventory/ItemDetails'
import type { InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { removeMeleeWeapon, useInventoryState } from '@/state/InventoryState'

type MeleeWeaponInventoryItem = InventoryItem<MeleeWeaponItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<MeleeWeaponInventoryItem>
> = [
  {
    className: 'w-1/2',
    key: 'name',
    render: (item: MeleeWeaponInventoryItem) => (
      <ItemDetails<MeleeWeaponInventoryItem> item={item} />
    ),
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
    className: 'w-1/6',
    key: 'points',
    render: (item) => {
      return EncumbrancePoint[item.points]
    },
    get title() {
      return t`Weight`
    },
  },
]

const MeleeWeaponsInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { meleeWeapons } = equipmentState

  const onRemoveClick = (item: MeleeWeaponInventoryItem) =>
    removeMeleeWeapon(item)

  return (
    <InventoryGrid<MeleeWeaponInventoryItem>
      data={meleeWeapons.get()}
      columns={inventoryTableColumns}
      onRemoveClick={onRemoveClick}
    />
  )
}

export default MeleeWeaponsInventoryGrid
