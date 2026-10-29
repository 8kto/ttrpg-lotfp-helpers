import { t } from '@lingui/macro'

import { EncumbranceUnit } from '@/domain/encumbrance'
import type { EquipmentItem } from '@/domain/equipment'

/**
 * Ammunition and gear from the LotFP firearms rules.
 * Weights follow the rulebook: italicized items are non-encumbering,
 * bold italic items are oversized, the rest are regular items.
 */
export const FirearmGearItems = (): ReadonlyArray<EquipmentItem> => [
  {
    categoryKey: 'miscEquipment',
    cityCostCp: 50,
    details: t`config.firearms.apostles.details`,
    name: t`12 Apostles`,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 80,
  },
  {
    categoryKey: 'miscEquipment',
    cityCostCp: 50,
    details: t`config.firearms.fireBomb.details`,
    name: t`Fire Bomb`,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 70,
  },
  {
    categoryKey: 'miscEquipment',
    cityCostCp: 3,
    details: t`One shot of powder.`,
    name: t`Gunpowder`,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 5,
  },
  {
    categoryKey: 'miscEquipment',
    cityCostCp: 1500,
    details: t`config.firearms.powderBarrel.details`,
    name: t`Gunpowder, Barrel`,
    points: EncumbranceUnit.OversizedX4,
    ruralCostCp: null,
  },
  {
    categoryKey: 'miscEquipment',
    cityCostCp: 10,
    details: t`Cord burns 10 cm per turn.`,
    name: t`Match Cord, 1 m`,
    points: EncumbranceUnit.None,
    ruralCostCp: 10,
  },
  {
    categoryKey: 'miscEquipment',
    cityCostCp: 10,
    details: t`config.firearms.powderHorn.details`,
    name: t`Powder Horn`,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 10,
  },
  {
    categoryKey: 'miscEquipment',
    cityCostCp: 10,
    details: t`config.firearms.scattershot.details`,
    name: t`Scattershot`,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 10,
  },
  {
    categoryKey: 'miscEquipment',
    cityCostCp: 20,
    details: t`Bag of 100 round shot.`,
    name: t`Shot Bag`,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 20,
  },
]
