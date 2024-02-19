import { useLingui } from '@lingui/react'
import classnames from 'classnames'
import React from 'react'

import type { DataGridColumn } from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'
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

  return (
    <td
      colSpan={isExpanded && shouldRenderDetails ? colSpan : 1}
      className={classnames(
        'p-2 font-normal text-gray-900 sm:p-4 break-keep',
        column.className,
      )}
      style={{
        display: isExpanded && !shouldRenderDetails ? 'none' : '',
      }}
      onClick={shouldRenderDetails ? onClick : undefined}
    >
      {column.render ? (
        column.render(item, i18n, state, isExpanded, shouldRenderDetails)
      ) : (
        <span
          className={classnames({
            'ph-dashed-text cursor-pointer hover:text-red-800 active:text-red-600 transition-all duration-200':
              shouldRenderDetails,
          })}
        >
          {item[column.key] as string}
        </span>
      )}

      {isExpanded && shouldRenderDetails
        ? column?.renderDetails?.(item, i18n, state)
        : null}
    </td>
  )
}

export default DataGridCell
