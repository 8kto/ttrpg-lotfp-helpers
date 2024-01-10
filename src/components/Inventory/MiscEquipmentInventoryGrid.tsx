import { t } from '@lingui/macro'
import React from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import {
  renderInventoryDetailsBody,
  renderInventoryTitle,
} from '@/components/EquipmentList/gridHelpers'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { removeEquipmentItem, useInventoryState } from '@/state/InventoryState'

type EquipmentInventoryItem = InventoryItem<EquipmentItem>

const columns: ReadonlyArray<DataGridColumn<EquipmentInventoryItem>> = [
  {
    className: 'w-2/3',
    key: 'name',
    shouldRenderDetails: (item) => !!item.details,
    render: renderInventoryTitle,
    renderDetails: renderInventoryDetailsBody,
    get title() {
      return t`Name`
    },
  },
]

const MiscEquipmentInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { miscEquipment } = equipmentState

  const onRemoveClick = (item: EquipmentInventoryItem) =>
    removeEquipmentItem(item)

  return (
    <DataGrid<EquipmentInventoryItem>
      data={miscEquipment.get()}
      columns={columns}
      onRemoveClick={onRemoveClick}
      spanDetails={columns.length}
      initialSortState={{
        key: '' as keyof EquipmentInventoryItem,
        direction: 'asc',
      }}
      noFilter
    />
  )
}

export default MiscEquipmentInventoryGrid
