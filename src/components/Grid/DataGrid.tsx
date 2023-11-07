import React, { useState, useEffect } from 'react'
import {EquipmentItem} from "@/shared/types"

interface DataGridColumn<T> {
  key: string;
  title: string;
  render?: (item: T) => React.ReactNode;
}

type SortOrder = 'asc' | 'desc'
type SortConfig = {
  key: string
  direction: SortOrder
}

interface DataGridProps<T> {
  data: Array<T>;
  columns: Array<DataGridColumn<T>>;
  initialSortState?: SortConfig;
  onCheckboxChange: (id: number) => void;
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
  filterFn: (item: T, filter: string) => boolean;
  isCheckedFn: (item: T) => boolean;
  filterPlaceholder?: string
}

const DataGrid = <T extends EquipmentItem>({
  data,
  columns,
  initialSortState,
  onCheckboxChange,
  onSortChange,
  filterFn,
  isCheckedFn,
  filterPlaceholder = 'Filter',
}: DataGridProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: initialSortState?.key || '',
    direction: initialSortState?.direction || 'asc',
  })
  const [filter, setFilter] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    let sortedData = [...data]
      .filter((item) => filterFn(item, filter))
      // FIXME types
      .sort((a, b) => {
        if (sortConfig.key) {
          // @ts-ignore
          if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
          // @ts-ignore
          if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    setFilteredData(sortedData)
  }, [data, filter, filterFn, sortConfig])

  const handleSortClick = (key: string) => {
    let direction: SortOrder = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    onSortChange?.(key, direction)
  }

  const sortIcon = (key: string) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white cursor-pointer`

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={filterPlaceholder}
        className="block w-full border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <table className="min-w-full">
        <thead className="bg-gray-50">
        <tr>
          <th scope="col" className={headerCellClassnames}></th>
          {columns.map((column) => (
            <th
              key={column.key}
              className={`${headerCellClassnames} ${sortConfig.key === column.key ? 'font-bold' : ''}`}
              onClick={() => handleSortClick(column.key)}
            >
              {column.title} {sortIcon(column.key)}
            </th>
          ))}
        </tr>
        </thead>
        <tbody className="bg-white">
        {filteredData.map((item, index) => (
          <tr key={item.id} className={index % 2 ? 'bg-gray-50' : ''}>
            <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap">
              <input
                type="checkbox"
                checked={isCheckedFn(item)}
                onChange={() => onCheckboxChange(item.id)}
                onClick={(e) => e.stopPropagation()}
              />
            </td>
            {columns.map((column) => (
              <td
                key={column.key}
                className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap"
                onClick={() => onCheckboxChange(item.id)}
              >
                {column.render
                  ? column.render(item)
                  // FIXME types
                  : (item as unknown as Record<string, string>)[column.key]}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default DataGrid
