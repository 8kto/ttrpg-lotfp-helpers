import type { InventoryColumn } from '@/components/Inventory/types'
import type { EquipmentItem, InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'

export const renderWeightInventoryCol: InventoryColumn<
  InventoryItem<EquipmentItem>
>['render'] = (item, i18n) =>
  item.points === EncumbrancePoint.None
    ? '-'
    : i18n._(EncumbrancePoint[item.points])
