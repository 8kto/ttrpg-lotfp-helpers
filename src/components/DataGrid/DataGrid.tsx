import {
  BackspaceIcon,
  PlusCircleIcon as PlusIcon,
} from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'

import { trivialSort } from '@/components/DataGrid/helpers'
import type {
  DataGridProps,
  SortConfig,
  SortOrder,
} from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain'
import { t } from '@/locale/helpers'

const DataGrid = <T extends EquipmentItem>({
  data,
  columns,
  initialSortState,
  onAddClick,
  onSortChange,
  filterFn,
  handleSort,
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
      .sort(handleSort ? handleSort(sortConfig) : trivialSort(sortConfig))

    setFilteredData(sortedData)
  }, [data, filter, filterFn, handleSort, sortConfig])

  const handleSortClick = (key: keyof T) => {
    let direction: SortOrder = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ direction, key })
    onSortChange?.(key, direction)
  }

  const handleFilterReset = () => {
    setFilter('')
  }

  const sortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return null
    }

    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left ph-color-accent uppercase cursor-pointer`

  return (
    <>
      <div className='my-4 flex w-full items-center md:w-1/2'>
        <div className='relative w-full'>
          <input
            type='text'
            id='voice-search'
            className='block w-full border border-gray-200 bg-gray-50 p-2.5 pl-4 text-base text-gray-900'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder={filterPlaceholder}
          />
          <button
            type='button'
            className='absolute inset-y-0 right-0 flex items-center pr-3'
            onClick={handleFilterReset}
          >
            <BackspaceIcon className='h-5 w-5 text-gray-500 hover:text-gray-900' />
          </button>
        </div>
      </div>
      <table className='min-w-full table-fixed'>
        <thead className='bg-gray-100'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                className={`${headerCellClassnames} ${
                  sortConfig.key === column.key ? 'font-bold' : ''
                } ${column.className ?? ''}`}
                onClick={() => handleSortClick(column.key)}
              >
                {t(column.title)} {sortIcon(column.key as string)}
              </th>
            ))}
            <th scope='col' className={`${headerCellClassnames} w-1/12`}></th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {filteredData.map((item, index) => (
            <tr key={item.name} className={index % 2 ? 'bg-gray-50' : ''}>
              {columns.map((column) => (
                <td
                  key={column.key as string}
                  className='whitespace-nowrap p-4 font-normal text-gray-900'
                >
                  {column.render
                    ? column.render(item)
                    : (item[column.key] as string)}
                </td>
              ))}
              <td className='whitespace-nowrap p-4 font-normal text-gray-900'>
                <button
                  className='inline-flex items-center rounded px-4 py-2 text-sm ph-btn-secondary'
                  onClick={() => onAddClick(item)}
                >
                  <PlusIcon className='mr-2 h-5 w-5' />
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
// TODO print details in cells
