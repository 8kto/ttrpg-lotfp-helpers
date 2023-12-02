import type { DataGridColumn } from '@/components/DataGrid/types'
import type { EquipmentItem, InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { autoincrement } from '@/shared/helpers/autoincrement'
import deepclone from '@/shared/helpers/deepclone'

export const getInventoryItem = (() => {
  const autoinc = autoincrement()

  return <T extends EquipmentItem>(item: T, cost: number): InventoryItem<T> => {
    return deepclone<InventoryItem<T>>({
      ...item,
      inventoryId: item.name + autoinc.next().value,
      lockedCost: cost,
    })
  }
})()

export const renderWeightGridCol: DataGridColumn<EquipmentItem>['render'] = (
  item,
  i18n,
) =>
  item.points === EncumbrancePoint.None
    ? '-'
    : i18n._(EncumbrancePoint[item.points])
