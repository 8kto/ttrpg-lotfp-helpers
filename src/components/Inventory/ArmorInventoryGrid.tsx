import { t } from '@lingui/macro'
import React from 'react'

import { renderNameInventoryGridCol } from '@/components/EquipmentList/gridHelpers'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import type { InventoryColumn } from '@/components/Inventory/types'
import type { ArmorItem } from '@/domain/armor'
import type { InventoryItem } from '@/domain/inventory'
import { removeArmor, useInventoryState } from '@/state/InventoryState'

type ArmorInventoryItem = InventoryItem<ArmorItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<ArmorInventoryItem>
> = [
  {
    className: 'w-1/2 sm:w-1/3',
    key: 'name',
    render: renderNameInventoryGridCol,
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
    <InventoryGrid<ArmorInventoryItem>
      data={armor.get()}
      columns={inventoryTableColumns}
      onRemoveClick={onRemoveClick}
    />
  )
}

export default ArmorInventoryGrid
