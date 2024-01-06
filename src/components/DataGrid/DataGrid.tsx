import {
  BackspaceIcon,
  PlusCircleIcon as PlusIcon,
} from '@heroicons/react/24/solid'
import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'

import { trivialSort } from '@/components/DataGrid/helpers'
import type {
  DataGridProps,
  SortConfig,
  SortOrder,
} from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'
import { useInventoryState } from '@/state/InventoryState'

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
  const { i18n } = useLingui()
  const { state } = useInventoryState()

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

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left uppercase cursor-pointer`

  return (
    <>
      <div className='my-4 flex w-full items-center md:w-1/2'>
        <div className='relative w-full'>
          <input
            type='text'
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
      <div className=''>
        <table className='min-w-full table-fixed'>
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
              <tr key={item.name} className={index % 2 ? 'bg-gray-50' : ''}>
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className={classnames(
                      'p-4 font-normal text-gray-900',
                      column.className,
                    )}
                  >
                    {column.render
                      ? column.render(item, i18n, state)
                      : (item[column.key] as string)}
                  </td>
                ))}
                <td className='p-4 font-normal text-gray-900'>
                  <button
                    className='ph-btn-secondary--off bg-transparent text-gray-400 hover:text-gray-900 inline-flex items-center rounded px-4 py-2 text-sm'
                    onClick={() => onAddClick(item)}
                  >
                    <PlusIcon className='h-5 w-5 md:mr-2' />
                    <span className='hidden xl:inline'>
                      <Trans>Add</Trans>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default DataGrid
