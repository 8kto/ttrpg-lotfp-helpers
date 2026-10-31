import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { getUniqueId } from '@/shared/helpers/autoincrement'
import deepclone from '@/shared/helpers/deepclone'

export const getInventoryItem = <T extends EquipmentItem>(
  item: T,
  costCp: number,
): InventoryItem<T> => {
  return deepclone<InventoryItem<T>>({
    ...item,
    inventoryId: item.name.toString() + getUniqueId(),
    lockedCostCp: costCp,
    qty: 1,
  })
}
