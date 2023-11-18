import React from 'react'

import type { InventoryColumn } from '@/components/Inventory/InventoryGrid'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import type { InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { removeArmor, useInventoryState } from '@/state/InventoryState'

type ArmorInventoryItem = InventoryItem<ArmorItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<ArmorInventoryItem>
> = [
  {
    className: 'w-1/2 truncate',
    key: 'name',
    render: (item: ArmorItem) => (
      <details className='ph-details-bullet'>
        <summary className='cursor-pointer list-none truncate p-4 pl-0'>
          <div className='flex items-center'>
            <span className='ph-custom-indicator mr-2 text-gray-400'>
              &#9654;
            </span>
            {item.name} <>(AC {item.armorClass})</>
          </div>
        </summary>
        <div className='pb-4'>
          <>{item.details}</>
          <ul className='ml-4 list-none pl-4'>
            <li>AC: ({item.armorClass})</li>
          </ul>
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
