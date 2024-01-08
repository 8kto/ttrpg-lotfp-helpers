import { t } from '@lingui/macro'
import React from 'react'

import { renderNameInventoryGridCol } from '@/components/EquipmentList/gridHelpers'
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
    className: 'w-2/3',
    key: 'name',
    render: renderNameInventoryGridCol,
    get title() {
      return t`Name`
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
