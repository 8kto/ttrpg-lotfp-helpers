import { MinusCircleIcon as MinusIcon } from '@heroicons/react/24/solid'
import React from 'react'

import type { EquipmentItem, InventoryItem } from '@/domain'

export interface InventoryColumn<T extends InventoryItem<EquipmentItem>> {
  key: keyof T
  title: string
  className?: string
  render?: (item: T) => React.ReactNode
}

export interface InventoryTableProps<T extends InventoryItem<EquipmentItem>> {
  data: ReadonlyArray<T>
  columns: ReadonlyArray<InventoryColumn<T>>
  onRemoveClick: (item: T) => void
}

function InventoryTable<T extends InventoryItem<EquipmentItem>>({
  data,
  columns,
  onRemoveClick,
}: InventoryTableProps<T>) {
  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`
  const cellClassnames = `px-4 text-sm font-normal text-gray-900`

  return (
    <table className='w-full table-fixed'>
      <thead className='bg-gray-50'>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key as string}
              className={`${headerCellClassnames} ${column.className ?? ''}`}
            >
              {column.title}
            </th>
          ))}
          <th className='p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500'></th>
        </tr>
      </thead>
      <tbody className='bg-white'>
        {data.map((item, index) => (
          <tr key={item.inventoryId} className={index % 2 ? 'bg-gray-50' : ''}>
            {columns.map((column) => (
              <td
                key={column.key as string}
                className={`${cellClassnames}${column.className ?? ''}`}
              >
                {column.render
                  ? column.render(item)
                  : (item[column.key] as React.ReactNode)}
              </td>
            ))}
            <td className={`${cellClassnames} w-1/6`}>
              <button
                className={'inline-flex items-center text-xs text-gray-500'}
                onClick={() => onRemoveClick(item)}
              >
                <MinusIcon className='mr-2 h-5 w-5' />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InventoryTable
