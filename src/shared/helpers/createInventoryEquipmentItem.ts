import type { EquipmentItem, InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { autoincrement } from '@/shared/helpers/autoincrement'

export const createInventoryEquipmentItem = <
  T extends InventoryItem<EquipmentItem>,
>(
  data: Partial<T>,
): Partial<T> => {
  if (!data.name) {
    throw new Error('No name provided')
  }
  if (!data.lockedCost) {
    throw new Error('No cost provided')
  }

  return {
    inventoryId: data.name + autoincrement().next().value,
    lockedCost: data.lockedCost ?? 0,
    points: data.points ?? EncumbrancePoint.Regular,
    ...data,
  }
}
