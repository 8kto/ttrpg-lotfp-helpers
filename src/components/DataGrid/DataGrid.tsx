import { PlusCircleIcon as PlusIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'

import type { EquipmentItem } from '@/domain'


export interface DataGridColumn<T extends EquipmentItem> {
  key: keyof T
  title: string
  className?: string
  render?: (item: T) => React.ReactNode
}

type SortOrder = 'asc' | 'desc'
type SortConfig<T extends EquipmentItem> = {
  key: keyof T
  direction: SortOrder
}

interface DataGridProps<T extends EquipmentItem> {
  data: ReadonlyArray<T>
  columns: ReadonlyArray<DataGridColumn<T>>
  initialSortState?: SortConfig<T>
  onAddClick: (item: T) => void
  onSortChange?: (key: keyof T, direction: SortOrder) => void
  filterFn: (item: T, filter: string) => boolean
  filterPlaceholder?: string
}

const DataGrid = <T extends EquipmentItem>({
  data,
  columns,
  initialSortState,
  onAddClick,
  onSortChange,
  filterFn,
  filterPlaceholder = 'Filter',
}: DataGridProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    direction: initialSortState?.direction || 'asc',
    key: (initialSortState?.key || '') as keyof T,
  })
  const [filter, setFilter] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    const sortedData = [...data]
      .filter((item) => filterFn(item, filter))
      .sort((a, b) => {
        if (sortConfig.key) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1
          }
        }

        return 0
      })
    setFilteredData(sortedData)
  }, [data, filter, filterFn, sortConfig])

  const handleSortClick = (key: keyof T) => {
    let direction: SortOrder = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ direction, key })
    onSortChange?.(key, direction)
  }

  const sortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return null
    }

    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white cursor-pointer`

  return (
    <>
      <div className='my-4 items-center justify-between lg:flex'>
        <input
          type='text'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={filterPlaceholder}
          className='block w-full border-0 py-1.5 pl-7 pr-20 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6'
        />
      </div>
      <table className='min-w-full'>
        <thead className='bg-gray-50'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                className={`${headerCellClassnames} ${
                  sortConfig.key === column.key ? 'font-bold' : ''
                } ${column.className ?? ''}`}
                onClick={() => handleSortClick(column.key)}
              >
                {column.title} {sortIcon(column.key as string)}
              </th>
            ))}
            <th scope='col' className={headerCellClassnames}></th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {filteredData.map((item, index) => (
            <tr key={item.name} className={index % 2 ? 'bg-gray-50' : ''}>
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className='whitespace-nowrap p-4 text-sm font-normal text-gray-900'
                >
                  {column.render
                    ? column.render(item)
                    : (item[column.key] as string)}
                </td>
              ))}
              <td className='whitespace-nowrap p-4 text-sm font-normal text-gray-900'>
                <button
                  className="bg-red-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={() => onAddClick(item)}
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default DataGrid
