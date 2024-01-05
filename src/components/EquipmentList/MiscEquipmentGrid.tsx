import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useMemo } from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import {
  renderCostGridCol,
  renderNameGridCol,
  renderWeightGridCol,
} from '@/components/EquipmentList/gridHelpers'
import Equipment from '@/config/Equipment'
import type { EquipmentItem } from '@/domain/equipment'
import { getInventoryItem } from '@/shared/helpers/getInventoryItem'
import { addEquipmentItem, useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<EquipmentItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    render: renderNameGridCol,
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
  const i18nContext = useLingui()

  const columnsFilteredByCost = useMemo(() => {
    const costCol = isCostRural.get() ? ruralCostColumn : cityCostColumn
    const lastIndex = columns.length - 1

    // put the Cost before the last column
    return [...columns.slice(0, lastIndex), costCol, columns[lastIndex]]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(
    () => {
      const data = Object.values(Equipment.MiscEquipment)

      return isCostRural.get()
        ? data.filter((i) => i.ruralCostCp !== null)
        : data
    },
    // NB! Don't remove i18nContext dep, since it causes the grid rerender on locale change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isCostRural, i18nContext],
  )

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

  return (
    <DataGrid<EquipmentItem>
      data={dataFilteredByCost}
      columns={columnsFilteredByCost}
      onAddClick={handleAddClick}
      filterFn={filterName}
      filterPlaceholder={t`Filter by name`}
    />
  )
}

export default MiscEquipmentGrid
