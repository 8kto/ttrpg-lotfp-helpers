import { t } from '@lingui/macro'
import React, { useMemo } from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import {
  renderCostGridCol,
  renderDetailsBody,
  renderWeightGridCol,
} from '@/components/EquipmentList/gridHelpers'
import Equipment from '@/config/Equipment'
import type { EquipmentItem } from '@/domain/equipment'
import { getInventoryItem } from '@/shared/helpers/getInventoryItem'
import useTailwindBreakpoint from '@/shared/hooks/useTailwindBreakpoint'
import { addEquipmentItem, useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<EquipmentItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    shouldRenderDetails: (item) => !!item.details,
    renderDetails: renderDetailsBody,
    get title() {
      return t`Name`
    },
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: renderWeightGridCol,
    get title() {
      return t`Weight`
    },
  },
]

const cityCostColumn: DataGridColumn<EquipmentItem> = {
  className: 'w-1/6',
  key: 'cityCostCp',
  render: renderCostGridCol,
  get title() {
    return t`Cost, sp`
  },
}
const ruralCostColumn: DataGridColumn<EquipmentItem> = {
  className: 'w-1/6',
  key: 'ruralCostCp',
  render: renderCostGridCol,
  get title() {
    return t`Cost, sp`
  },
}

const MiscEquipmentGrid = () => {
  const {
    state: { isCostRural },
  } = useInventoryState()
  const breakpoint = useTailwindBreakpoint()
  const columnsFilteredByCost = useMemo(() => {
    const costCol = isCostRural.get() ? ruralCostColumn : cityCostColumn
    const lastIndex = columns.length - 1

    // put the Cost before the last column
    return [...columns.slice(0, lastIndex), costCol, columns[lastIndex]]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(Equipment.MiscEquipment)

    return isCostRural.get() ? data.filter((i) => i.ruralCostCp !== null) : data
  }, [isCostRural])

  const handleAddClick = (item: EquipmentItem) => {
    const clone = getInventoryItem(
      item,
      (isCostRural.get() ? item.ruralCostCp : item.cityCostCp)!,
    )

    addEquipmentItem(clone)
  }

  const filterName = (item: EquipmentItem, filterBy: string) => {
    return item.name.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase())
  }

  const isSmallViewport = 'xs' === breakpoint
  const colSpan = isSmallViewport
    ? columnsFilteredByCost.length - 1
    : columnsFilteredByCost.length

  return (
    <DataGrid<EquipmentItem>
      data={dataFilteredByCost}
      columns={columnsFilteredByCost}
      onAddClick={handleAddClick}
      filterFn={filterName}
      filterPlaceholder={t`Filter by name`}
      spanDetails={colSpan}
    />
  )
}

export default MiscEquipmentGrid
