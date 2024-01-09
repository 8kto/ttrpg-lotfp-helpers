import {
  MinusCircleIcon as MinusIcon,
  PlusCircleIcon as PlusIcon,
} from '@heroicons/react/24/solid'
import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classnames from 'classnames'
import React, { useState } from 'react'

import type { DataGridColumn } from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'
import { useInventoryState } from '@/state/InventoryState'

// TODO extract
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
      onClick={shouldRenderDetails ? onClick : undefined}
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

export type DataGridRowProps<T extends EquipmentItem> = {
  columns: ReadonlyArray<DataGridColumn<T>>
  item: T
  index: number
  spanDetails: number
  onAddClick?: (item: T) => void
  onRemoveClick?: (item: T) => void
}

const DataGridRow = <T extends EquipmentItem>({
  columns,
  item,
  spanDetails,
  index,
  onAddClick,
  onRemoveClick,
}: DataGridRowProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <tr key={item.name} className={classnames({ 'bg-gray-50': index % 2 })}>
      {columns.map((column) => (
        <DataGridCell<T>
          item={item}
          colSpan={spanDetails}
          onClick={() => setIsExpanded((v) => !v)}
          column={column}
          expanded={isExpanded}
          key={column.key as string}
        />
      ))}

      <td className={'p-4 font-normal text-gray-900'}>
        {/* Add btn */}
        {typeof onAddClick === 'function' && (
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
        )}
        {/* Remove btn */}
        {typeof onRemoveClick === 'function' && (
          <button
            type='button'
            className='ph-btn-secondary--off inline-flex items-center rounded bg-transparent px-4 py-2 text-sm text-gray-400 hover:text-gray-900'
            onClick={() => onRemoveClick(item)}
          >
            <MinusIcon className='h-5 w-5 md:mr-2' />
            {/* Due to a limited use cases for this button I let myself
              not to mess with extra props hiding/showing the label,
              and simply removed it. */}
          </button>
        )}
      </td>
    </tr>
  )
}

export default DataGridRow
