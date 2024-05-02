import { CurrencyType } from '@/domain/currency'
import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem, EquipmentItemDto } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
import { getAutoIncrementedId } from '@/shared/helpers/autoincrement'
import CurrencyConverter from '@/shared/services/CurrencyConverter'
import type { EquipmentCategoryKey } from '@/state/InventoryState'

export const EquipLabelsDict: Record<EquipmentCategoryKey, string> = {
  armor: /*i18n*/ 'Armor',
  firearmWeapons: /*i18n*/ 'Firearms',
  meleeWeapons: /*i18n*/ 'Mêlée weapons',
  miscEquipment: /*i18n*/ 'Miscellaneous',
  missileWeapons: /*i18n*/ 'Missile weapons',
}

export const EncumbrancePointsLabelsDict: ReadonlyArray<
  [EncumbranceUnit, string]
> = [
  [EncumbranceUnit.None, /*i18n*/ 'None'],
  [EncumbranceUnit.Regular, /*i18n*/ 'Regular'],
  [EncumbranceUnit.Heavy, /*i18n*/ 'Heavy'],
  [EncumbranceUnit.Oversized, /*i18n*/ 'Oversized'],
]

export const getCustomEquipmentItem = (
  data: EquipmentItemDto,
): InventoryItem<EquipmentItem> => {
  if (!data.name) {
    throw new Error('No name provided')
  }
  if (!data.points) {
    throw new Error('No points provided')
  }

  const costRaw = Number(data.cost) || 0
  const costCp = CurrencyConverter.convertFromTo(
    {
      currency: data.currencyType,
      value: costRaw,
    },
    CurrencyType.Copper,
  ).value

  return {
    categoryKey: data.category,
    cityCostCp: costCp,
    details: data.details || null,
    inventoryId: data.name + getAutoIncrementedId(),
    lockedCostCp: costCp,
    name: data.name,
    points: Number(data.points),
    qty: 1,
    ruralCostCp: costCp,
  }
}
