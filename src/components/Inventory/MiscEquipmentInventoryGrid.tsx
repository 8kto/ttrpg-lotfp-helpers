import { t } from '@lingui/macro'
import React from 'react'

import { renderNameGridCol } from '@/components/EquipmentList/gridHelpers'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import type { InventoryColumn } from '@/components/Inventory/types'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { removeEquipmentItem, useInventoryState } from '@/state/InventoryState'

type EquipmentInventoryItem = InventoryItem<EquipmentItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<EquipmentInventoryItem>
> = [
  {
    className: 'w-2/3 sm:w-1/3',
    key: 'name',
    render: renderNameGridCol,
    get title() {
      return t`Name`
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
