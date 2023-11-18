import React from 'react'

import type { InventoryColumn } from '@/components/Inventory/InventoryGrid'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import type { EquipmentItem, InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { removeEquipmentItem, useInventoryState } from '@/state/InventoryState'

type EquipmentInventoryItem = InventoryItem<EquipmentItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<EquipmentInventoryItem>
> = [
  {
    className: 'w-1/2 truncate',
    key: 'name',
    render: (item: EquipmentItem) => (
      <details className='ph-details-bullet'>
        <summary className='cursor-pointer list-none truncate p-4 pl-0'>
          <div className='flex items-center'>
            <span className='ph-custom-indicator mr-2 text-gray-400'>
              &#9654;
            </span>
            {item.name} {item.details ? <>(i)</> : ''}
          </div>
        </summary>
        <div className='pb-4'>
          <p>{item.details}</p>
        </div>
      </details>
    ),
    title: 'Name',
  },
  {
    className: 'w-1/6',
    key: 'lockedCost',
    title: 'Cost',
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: (item) => {
      return EncumbrancePoint[item.points]
    },
    title: 'Weight',
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
