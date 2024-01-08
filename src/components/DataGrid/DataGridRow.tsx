import { PlusCircleIcon as PlusIcon } from '@heroicons/react/24/solid'
import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classnames from 'classnames'
import React, { useState } from 'react'

import type { DataGridColumn } from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'
import useTailwindBreakpoint from '@/shared/hooks/useTailwindBreakpoint'
import { useInventoryState } from '@/state/InventoryState'

const DataGridCell = <T extends EquipmentItem>({
  column,
  item,
  colSpan,
  onClick,
  expanded: isExpanded,
}: {
  colSpan: number
  column: DataGridColumn<T>
  item: T
  expanded: boolean
  onClick: () => void
}) => {
  const { i18n } = useLingui()
  const { state } = useInventoryState()

  const shouldRenderDetails = !!column?.shouldRenderDetails?.(item)
  const title = column.render
    ? column.render(item, i18n, state)
    : (item[column.key] as string)

  return (
    <td
      colSpan={isExpanded && shouldRenderDetails ? colSpan : 1}
      className={classnames('p-4 font-normal text-gray-900', column.className)}
      style={{
        display: isExpanded && !shouldRenderDetails ? 'none' : '',
      }}
      onClick={onClick}
    >
      <span
        className={classnames({
          'ph-dashed-text cursor-pointer': shouldRenderDetails,
        })}
      >
        {title}
      </span>

      {isExpanded && shouldRenderDetails
        ? column?.renderDetails?.(item, i18n, state)
        : null}
    </td>
  )
}

const DataGridRow = <T extends EquipmentItem>({
  columns,
  item,
  index,
  onAddClick,
}: {
  columns: ReadonlyArray<DataGridColumn<T>>
  item: T
  index: number
  onAddClick: (item: T) => void
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const breakpoint = useTailwindBreakpoint()
  const isSmallViewport = 'xs' === breakpoint
  const colSpan = isSmallViewport ? columns.length - 1 : columns.length

  return (
    <tr key={item.name} className={classnames({ 'bg-gray-50': index % 2 })}>
      {columns.map((column) => (
        <DataGridCell<T>
          item={item}
          colSpan={colSpan}
          onClick={() => setIsExpanded((v) => !v)}
          column={column}
          expanded={isExpanded}
          key={column.key as string}
        />
      ))}
      {/* Add action btn */}
      <td className={'p-4 font-normal text-gray-900'}>
        <button
          type='button'
          className='ph-btn-secondary--off inline-flex items-center rounded bg-transparent px-4 py-2 text-sm text-gray-400 hover:text-gray-900'
          onClick={() => onAddClick(item)}
        >
          <PlusIcon className='h-5 w-5 md:mr-2' />
          <span className='hidden xl:inline'>
            <Trans>Add</Trans>
          </span>
        </button>
      </td>
    </tr>
  )
}

export default DataGridRow
