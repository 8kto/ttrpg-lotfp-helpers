import { t } from '@lingui/macro'
import React from 'react'

import { renderNameGridCol } from '@/components/EquipmentList/gridHelpers'
import { renderWeightInventoryCol } from '@/components/Inventory/helpers'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import type { InventoryColumn } from '@/components/Inventory/types'
import type { EquipmentItem, InventoryItem } from '@/domain'
import { removeEquipmentItem, useInventoryState } from '@/state/InventoryState'

type EquipmentInventoryItem = InventoryItem<EquipmentItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<EquipmentInventoryItem>
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

const MiscEquipmentInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { miscEquipment } = equipmentState

  // console.log(miscEquipment.get().map((o) => [o.name, 1]))

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
