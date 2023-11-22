import type { EquipmentItem, EquipmentItemDto, InventoryItem } from '@/domain'
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

export const getEquipmentItem = (() => {
  const generator = autoincrement()

  return (data: EquipmentItemDto): InventoryItem<EquipmentItem> => {
    if (!data.name) {
      throw new Error('No name provided')
    }
    if (!data.points) {
      throw new Error('No points provided')
    }

    return {
      cityCost: Number(data.cost) || 0,
      details: data.details || null,
      inventoryId: data.name + generator.next().value,
      lockedCost: Number(data.cost) || 0,
      name: data.name,
      points: Number(data.points),
      ruralCost: data.cost || null,
    }
  }
})()
