import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { getAutoIncrementedId } from '@/shared/helpers/autoincrement'
import deepclone from '@/shared/helpers/deepclone'

export const getInventoryItem = <T extends EquipmentItem>(
  item: T,
  costCp: number,
): InventoryItem<T> => {
  return deepclone<InventoryItem<T>>({
    ...item,
    inventoryId: item.name.toString() + getAutoIncrementedId(),
    lockedCostCp: costCp,
    qty: 1,
  })
}
