import { PlusCircleIcon as PlusIcon } from '@heroicons/react/24/solid'
import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classnames from 'classnames'
import React, { useState } from 'react'

import type { DataGridColumn } from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'
import { useInventoryState } from '@/state/InventoryState'

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
  const { i18n } = useLingui()
  const { state } = useInventoryState()
  const [isExpanded, setIsExpanded] = useState(false)

  const cellClassnames = 'p-4 font-normal text-gray-900'

  return (
    <tr key={item.name} className={classnames({ 'bg-gray-50': index % 2 })}>
      {columns.map((column) => {
        const shouldRenderDetails = !!column?.shouldRenderDetails?.(item)
        const title = column.render
          ? column.render(item, i18n, state)
          : (item[column.key] as string)

        const toggleExpand = shouldRenderDetails
          ? () => setIsExpanded(!isExpanded)
          : undefined

        // FIXME mobile devices have some cells hidden
        return (
          <td
            key={column.key as string}
            colSpan={isExpanded && shouldRenderDetails ? columns.length : 1}
            className={classnames(cellClassnames, column.className)}
            style={{
              display: isExpanded && !shouldRenderDetails ? 'none' : '',
            }}
            onClick={toggleExpand}
          >
            <span
              className={classnames({
                'ph-dashed-text cursor-pointer': shouldRenderDetails,
              })}
            >
              {title}
            </span>

            {isExpanded && shouldRenderDetails
              ? column?.renderDetails?.(item, i18n)
              : null}
          </td>
        )
      })}
      {/* Add action btn */}
      <td className={cellClassnames}>
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
