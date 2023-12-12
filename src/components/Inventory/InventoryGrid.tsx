import { MinusCircleIcon as MinusIcon } from '@heroicons/react/24/solid'
import { useLingui } from '@lingui/react'
import React from 'react'

import type { InventoryColumn } from '@/components/Inventory/types'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'

export interface InventoryTableProps<T extends InventoryItem<EquipmentItem>> {
  data: ReadonlyArray<T>
  columns: ReadonlyArray<InventoryColumn<T>>
  onRemoveClick: (item: T) => void
}

function InventoryGrid<T extends InventoryItem<EquipmentItem>>({
  data,
  columns,
  onRemoveClick,
}: InventoryTableProps<T>) {
  const { i18n } = useLingui()
  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left ph-color-accent uppercase`
  const cellClassnames = `p-4 font-normal text-gray-900 align-top`

  return (
    <table className='w-full table-fixed'>
      <thead className='bg-gray-100'>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key as string}
              className={`${headerCellClassnames} ${column.className ?? ''}`}
            >
              {column.title}
            </th>
          ))}
          <th className='font-base w-1/6 text-center text-xs text-gray-500'></th>
        </tr>
      </thead>
      <tbody className='bg-white'>
        {data.map((item, index) => (
          <tr key={item.inventoryId} className={index % 2 ? 'bg-gray-50' : ''}>
            {columns.map((column) => (
              <td
                key={column.key as string}
                className={`${cellClassnames} ${column.className ?? ''}`}
              >
                {column.render
                  ? column.render(item, i18n)
                  : (item[column.key] as React.ReactNode)}
              </td>
            ))}
            <td className={`${cellClassnames} text-center`}>
              <button
                className={
                  'me-auto inline-flex items-center text-xs text-gray-400 hover:text-gray-900'
                }
                onClick={() => onRemoveClick(item)}
              >
                <MinusIcon className='me-auto h-5 w-5' />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InventoryGrid
