import { t } from '@lingui/macro'
import React from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import {
  renderInventoryDetailsBody,
  renderInventoryTitle,
} from '@/components/EquipmentList/gridHelpers'
import type { ArmorItem } from '@/domain/armor'
import type { InventoryItem } from '@/domain/inventory'
import { removeArmor, useInventoryState } from '@/state/InventoryState'

type ArmorInventoryItem = InventoryItem<ArmorItem>

const columns: ReadonlyArray<DataGridColumn<ArmorInventoryItem>> = [
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
    key: 'armorClass',
    get title() {
      return t`AC`
    },
  },
]

const ArmorInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { armor } = equipmentState

  const onRemoveClick = (item: ArmorInventoryItem) => removeArmor(item)

  return (
    <DataGrid<ArmorInventoryItem>
      data={armor.get()}
      columns={columns}
      onRemoveClick={onRemoveClick}
      spanDetails={columns.length}
      initialSortState={{
        key: '' as keyof ArmorInventoryItem,
        direction: 'asc',
      }}
      noFilter
    />
  )
}

export default ArmorInventoryGrid
