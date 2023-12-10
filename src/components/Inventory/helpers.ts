import type { InventoryColumn } from '@/components/Inventory/types'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'

export const renderWeightInventoryCol: InventoryColumn<
  InventoryItem<EquipmentItem>
>['render'] = (item, i18n) =>
  item.points === EncumbrancePoint.None
    ? '-'
    : i18n._(EncumbrancePoint[item.points])
