import { t } from '@lingui/macro'
import React from 'react'

import { renderNameGridCol } from '@/components/EquipmentList/gridHelpers'
import { renderWeightInventoryCol } from '@/components/Inventory/helpers'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import type { InventoryColumn } from '@/components/Inventory/types'
import type { InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { removeArmor, useInventoryState } from '@/state/InventoryState'

type ArmorInventoryItem = InventoryItem<ArmorItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<ArmorInventoryItem>
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
