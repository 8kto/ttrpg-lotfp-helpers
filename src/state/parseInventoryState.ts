import { CurrencyType } from '@/domain/currency'
import { EncumbranceThreshold } from '@/domain/encumbrance'
import type { InventoryStateType } from '@/state/InventoryState'
import { EquipmentStateKeys } from '@/state/InventoryState'

type UnknownRecord = Record<string, unknown>

const BOOLEAN_KEYS = [
  'isCoinWeightActive',
  'isCostRural',
  'isFirearmsCampaign',
  'isWalletManaged',
] as const

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isMissing = (value: unknown) => value === undefined || value === null

const isAmount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0

const isOptionalAmount = (value: unknown) => isMissing(value) || isAmount(value)

const isOptionalRange = (value: unknown) =>
  isMissing(value) ||
  (isRecord(value) &&
    isAmount(value.short) &&
    isAmount(value.medium) &&
    isAmount(value.long))

const isOptionalDamage = (value: unknown) =>
  isMissing(value) ||
  (isRecord(value) && isAmount(value.x) && typeof value.dice === 'string')

const isOptionalArmorClass = (value: unknown) =>
  isMissing(value) || typeof value === 'number' || typeof value === 'string'

const isOptionalText = (value: unknown) =>
  isMissing(value) || typeof value === 'string'

const isValidItem = (item: unknown, categoryKey: string) =>
  isRecord(item) &&
  item.categoryKey === categoryKey &&
  typeof item.name === 'string' &&
  !!item.name &&
  typeof item.inventoryId === 'string' &&
  !!item.inventoryId &&
  isAmount(item.qty) &&
  item.qty > 0 &&
  isAmount(item.points) &&
  isAmount(item.lockedCostCp) &&
  isOptionalAmount(item.cityCostCp) &&
  isOptionalAmount(item.ruralCostCp) &&
  isOptionalAmount(item.physicalSaveBonus) &&
  isOptionalArmorClass(item.armorClass) &&
  isOptionalDamage(item.damage) &&
  isOptionalDamage(item.damageMelee) &&
  isOptionalRange(item.range) &&
  isOptionalText(item.details)

const isValidWallet = (wallet: unknown) => {
  if (!isRecord(wallet)) {
    return false
  }

  const keys = Object.keys(wallet)

  return (
    keys.length === Object.keys(CurrencyType).length &&
    keys.every((key) => key in CurrencyType && isAmount(wallet[key]))
  )
}

/**
 * TODO use schema+validation
 * Return the state from an import if it is safe to use, otherwise null.
 * The keys missing in the exports of older versions are allowed,
 * @see setState fills them in.
 */
export const parseInventoryState = (
  data: unknown,
): Partial<InventoryStateType> | null => {
  if (!isRecord(data)) {
    return null
  }

  const isValid =
    EquipmentStateKeys.every((key) => {
      const items = data[key]

      return (
        items === undefined ||
        (Array.isArray(items) && items.every((i) => isValidItem(i, key)))
      )
    }) &&
    (data.wallet === undefined || isValidWallet(data.wallet)) &&
    (data.encumbranceThreshold === undefined ||
      data.encumbranceThreshold === EncumbranceThreshold.Regular ||
      data.encumbranceThreshold === EncumbranceThreshold.Dwarf) &&
    BOOLEAN_KEYS.every(
      (key) => data[key] === undefined || typeof data[key] === 'boolean',
    )

  return isValid ? (data as Partial<InventoryStateType>) : null
}
