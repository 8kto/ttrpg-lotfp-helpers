import { t } from '@lingui/macro'
import React from 'react'

import type { InventoryColumn } from '@/components/Inventory/InventoryGrid'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import ItemDetails from '@/components/Inventory/ItemDetails'
import type { EquipmentItem, InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { removeEquipmentItem, useInventoryState } from '@/state/InventoryState'

type EquipmentInventoryItem = InventoryItem<EquipmentItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<EquipmentInventoryItem>
> = [
  {
    className: 'w-1/2',
    key: 'name',
    render: (item: EquipmentInventoryItem) => (
      <ItemDetails<EquipmentInventoryItem> item={item} />
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

const MiscEquipmentInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { miscEquipment } = equipmentState

  const onRemoveClick = (item: InventoryItem<EquipmentItem>) =>
    removeEquipmentItem(item)

  return (
    <InventoryGrid<EquipmentInventoryItem>
      data={miscEquipment.get()}
      columns={inventoryTableColumns}
      onRemoveClick={onRemoveClick}
    />
  )
}

export default MiscEquipmentInventoryGrid
