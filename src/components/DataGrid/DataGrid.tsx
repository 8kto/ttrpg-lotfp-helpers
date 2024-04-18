import { BackspaceIcon } from '@heroicons/react/24/solid'
import classnames from 'classnames'
import React, { useMemo, useState } from 'react'

import type { DataGridRowProps } from '@/components/DataGrid/DataGridRow'
import DataGridRow from '@/components/DataGrid/DataGridRow'
import { trivialSort } from '@/components/DataGrid/helpers'
import type {
  DataGridProps,
  SortConfig,
  SortOrder,
} from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'

const DataGrid = <T extends EquipmentItem>({
  data,
  columns,
  spanDetails,
  initialSortState,
  onAddClick,
  onRemoveClick,
  filterFn,
  handleSort,
  filterPlaceholder = 'Filter',
  noFilter = false,
}: DataGridProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    direction: initialSortState?.direction ?? 'asc',
    key: (initialSortState?.key ?? 'name') as keyof T,
  })
  const [filter, setFilter] = useState('')

  const filteredData = useMemo(() => {
    const filtered =
      typeof filterFn === 'function'
        ? [...data].filter((item) => filterFn(item, filter))
        : [...data]

    return filtered.sort(
      handleSort ? handleSort(sortConfig) : trivialSort(sortConfig),
    )
  }, [data, filter, filterFn, handleSort, sortConfig])

  const handleSortClick = (key: keyof T) => {
    let direction: SortOrder = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ direction, key })
  }

  const handleFilterReset = () => setFilter('')

  const sortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return null
    }

    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left uppercase cursor-pointer`

  const eventHandlers: Partial<DataGridRowProps<T>> = {
    onAddClick: typeof onAddClick === 'function' ? onAddClick : undefined,
    onRemoveClick:
      typeof onRemoveClick === 'function' ? onRemoveClick : undefined,
  }

  return (
    <>
      {!noFilter && (
        <div className='my-4 flex w-full items-center xl:w-1/2'>
          <div className='relative w-full'>
            <input
              type='text'
              className='block w-full border border-gray-200 bg-gray-50 p-2.5 pl-4 text-sm text-gray-900 sm:text-base'
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
      )}
      <div className='overflow-x-auto'>
        <table className='min-w-full table-fixed text-sm sm:text-base' data-testid="DataGrid__Table">
          <thead className='bg-gray-100'>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className={classnames(
                    headerCellClassnames,
                    column.className,
                    {
                      'ph-color-accent': sortConfig.key === column.key,
                      'ph-color-muted': sortConfig.key !== column.key,
                    },
                  )}
                  onClick={() => handleSortClick(column.key)}
                >
                  {column.title} {sortIcon(column.key as string)}
                </th>
              ))}
              <th scope='col' className={`${headerCellClassnames} w-1/12`}></th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {filteredData.map((item, index) => (
              <DataGridRow<T>
                key={item.name}
                columns={columns}
                item={item}
                index={index}
                spanDetails={spanDetails}
                {...eventHandlers}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default DataGrid
