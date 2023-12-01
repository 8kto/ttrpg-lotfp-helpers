import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useMemo } from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import { getInventoryItem } from '@/components/EquipmentList/helpers'
import ItemDetails from '@/components/Inventory/ItemDetails'
import EquipmentTranslated from '@/config/EquipmentTranslated'
import type { EquipmentItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { addEquipmentItem, useInventoryState } from '@/state/InventoryState'

const columns: ReadonlyArray<DataGridColumn<EquipmentItem>> = [
  {
    className: 'w-1/3',
    key: 'name',
    render: (item: EquipmentItem) => (
      <ItemDetails<EquipmentItem> item={item} compact />
    ),
    get title() {
      return t`Name`
    },
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: (item: EquipmentItem) => (
      <span>{EncumbrancePoint[item.points]}</span>
    ),
    get title() {
      return t`Weight`
    },
  },
]

const cityCostColumn: DataGridColumn<EquipmentItem> = {
  className: 'w-1/6',
  key: 'cityCost',
  get title() {
    return t`City Cost`
  },
}
const ruralCostColumn: DataGridColumn<EquipmentItem> = {
  className: 'w-1/6',
  key: 'ruralCost',
  get title() {
    return t`Rural Cost`
  },
}

const MiscEquipmentGrid = () => {
  const { i18n } = useLingui()
  const {
    state: { isCostRural },
  } = useInventoryState()
  const columnsFilteredByCost = useMemo(() => {
    return isCostRural.get()
      ? [...columns, ruralCostColumn]
      : [...columns, cityCostColumn]
  }, [isCostRural])

  const dataFilteredByCost = useMemo(() => {
    const data = Object.values(new EquipmentTranslated(i18n).MiscEquipment)

    return isCostRural.get() ? data.filter((i) => i.ruralCost !== null) : data
  }, [i18n, isCostRural])

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
      filterPlaceholder={t`Filter by name`}
    />
  )
}

export default MiscEquipmentGrid
