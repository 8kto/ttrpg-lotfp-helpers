import type { InventoryColumn } from '@/components/Inventory/types'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'

export const renderWeightInventoryCol: InventoryColumn<
  InventoryItem<EquipmentItem>
>['render'] = (item, i18n) =>
  item.points === EncumbranceUnit.None
    ? '-'
    : i18n._(EncumbranceUnit[item.points])
