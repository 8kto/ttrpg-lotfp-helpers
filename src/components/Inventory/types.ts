import type { DataGridColumn } from '@/components/DataGrid/types'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'

export interface InventoryColumn<T extends InventoryItem<EquipmentItem>> {
  key: keyof T
  title: string
  className?: string
  render?: DataGridColumn<EquipmentItem>['render']
}
