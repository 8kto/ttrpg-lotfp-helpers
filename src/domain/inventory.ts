import type { EquipmentItem } from '@/domain/equipment'

export type InventoryItem<T extends EquipmentItem> = {
  [P in keyof T]: T[P]
} & {
  inventoryId: string
  lockedCost: number
}
