import React, { useMemo } from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import { getInventoryItem } from '@/components/EquipmentList/helpers'
import { AllEquipment } from '@/config/AllEquipment'
import type { EquipmentItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { t } from '@/locale/helpers'
import { addEquipmentItem, useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<EquipmentItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    title: 'Name',
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: (item: EquipmentItem) => (
      <span>{EncumbrancePoint[item.points]}</span>
    ),
    title: 'Weight',
  },
]

const cityCostColumn: DataGridColumn<EquipmentItem> = {
  className: 'w-1/6',
  key: 'cityCost',
  title: 'City Cost',
}
const ruralCostColumn: DataGridColumn<EquipmentItem> = {
  className: 'w-1/6',
  key: 'ruralCost',
  title: 'Rural Cost',
}

const MiscEquipmentGrid = () => {
  const {
    state: { isCostRural },
  } = useInventoryState()
  const columnsFilteredByCost = useMemo(() => {
    return isCostRural.get()
      ? [...columns, ruralCostColumn]
      : [...columns, cityCostColumn]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(AllEquipment.MiscEquipment)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [isCostRural])

  const handleAddClick = (item: EquipmentItem) => {
    const clone = getInventoryItem(
      item,
      (isCostRural.get() ? item.ruralCost : item.cityCost)!,
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
      filterPlaceholder={t('Filter by name')}
    />
  )
}

export default MiscEquipmentGrid
