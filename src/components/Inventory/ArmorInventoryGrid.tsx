import { t } from '@lingui/macro'
import React from 'react'

import type { InventoryColumn } from '@/components/Inventory/InventoryGrid'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import ItemDetails from '@/components/Inventory/ItemDetails'
import type { InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { removeArmor, useInventoryState } from '@/state/InventoryState'

type ArmorInventoryItem = InventoryItem<ArmorItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<ArmorInventoryItem>
> = [
  {
    className: 'w-1/2',
    key: 'name',
    render: (item: ArmorInventoryItem) => (
      <ItemDetails<ArmorInventoryItem> item={item} />
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

const ArmorInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { armor } = equipmentState

  const onRemoveClick = (item: ArmorInventoryItem) => removeArmor(item)

  return (
    <InventoryGrid<ArmorInventoryItem>
      data={armor.get()}
      columns={inventoryTableColumns}
      onRemoveClick={onRemoveClick}
    />
  )
}

export default ArmorInventoryGrid
