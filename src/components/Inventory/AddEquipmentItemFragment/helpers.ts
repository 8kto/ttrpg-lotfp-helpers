import type { EquipmentItem, InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { t } from '@/locale/helpers'
import { autoincrement } from '@/shared/helpers/autoincrement'
import type { EquipmentCategoryKey } from '@/state/InventoryState'

export const EquipLabelsDict: Record<EquipmentCategoryKey, string> = {
  armor: t('Armor'),
  meleeWeapons: t('Mêlée weapons'),
  miscEquipment: t('Miscellaneous'),
  missileWeapons: t('Missile weapons'),
}

export const EncumbrancePointsLabelsDict: Record<EncumbrancePoint, string> = {
  [EncumbrancePoint.None]: t('None'),
  [EncumbrancePoint.Regular]: t('Regular'),
  [EncumbrancePoint.Heavy]: t('Heavy'),
  [EncumbrancePoint.Oversized]: t('Oversized'),
}

export type EquipmentItemDto = {
  name: string
  cost?: number
  isCopper: boolean
  category: EquipmentCategoryKey
  points: EncumbrancePoint
  details: string | null
}

export const getEquipmentItem = (
  data: EquipmentItemDto,
): InventoryItem<EquipmentItem> => {
  return {
    cityCost: data.cost || 0,
    details: data.details || null,
    inventoryId: autoincrement().next().value,
    lockedCost: data.cost || 0,
    name: data.name,
    points: data.points,
    ruralCost: data.cost || null,
  }
}
