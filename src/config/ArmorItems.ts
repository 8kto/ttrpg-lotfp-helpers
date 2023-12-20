import { t } from '@lingui/macro'

import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'

export const ArmorItems = (): ReadonlyArray<ArmorItem> => [
  {
    armorClass: 14,
    categoryKey: 'armor',
    cityCostCp: 250,
    name: t`Leather`,
    points: EncumbrancePoint.None,
    ruralCostCp: 500,
    type: ArmorType.Armor,
  },
  {
    armorClass: 16,
    categoryKey: 'armor',
    cityCostCp: 1000,
    name: t`Chain`,
    points: EncumbrancePoint.Oversized,
    ruralCostCp: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: 18,
    categoryKey: 'armor',
    cityCostCp: 10000,
    details: t`config.armor.plate.details`,
    name: t`Plate`,
    points: EncumbrancePoint.Heavy,
    ruralCostCp: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: '+1,+2',
    categoryKey: 'armor',
    cityCostCp: 100,
    details: t`+1 AC versus mêlée attacks, +2 AC versus missile attacks.`,
    name: t`Shield`,
    points: EncumbrancePoint.Oversized,
    ruralCostCp: 250,
    type: ArmorType.Shield,
  },
  {
    armorClass: 14,
    categoryKey: 'armor',
    cityCostCp: 2500,
    name: t`Leather Barding`,
    points: EncumbrancePoint.None,
    ruralCostCp: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 16,
    categoryKey: 'armor',
    cityCostCp: 5000,
    name: t`Chain Barding`,
    points: EncumbrancePoint.Oversized,
    ruralCostCp: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 18,
    categoryKey: 'armor',
    cityCostCp: 10000,
    name: t`Plate Barding`,
    points: EncumbrancePoint.Heavy,
    ruralCostCp: null,
    type: ArmorType.Barding,
  },
]
