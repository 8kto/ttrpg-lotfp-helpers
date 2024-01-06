import { t } from '@lingui/macro'

import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbranceUnit } from '@/domain/encumbrance'

export const ArmorItems = (): ReadonlyArray<ArmorItem> => [
  {
    armorClass: 14,
    categoryKey: 'armor',
    cityCostCp: 250,
    name: t`Leather`,
    points: EncumbranceUnit.None,
    ruralCostCp: 500,
    type: ArmorType.Armor,
  },
  {
    armorClass: 16,
    categoryKey: 'armor',
    cityCostCp: 1000,
    name: t`Chain`,
    points: EncumbranceUnit.Oversized,
    ruralCostCp: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: 18,
    categoryKey: 'armor',
    cityCostCp: 10000,
    details: t`config.armor.plate.details`,
    name: t`Plate`,
    points: EncumbranceUnit.Heavy,
    ruralCostCp: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: '+1,+2',
    categoryKey: 'armor',
    cityCostCp: 100,
    details: t`+1 AC versus mêlée attacks, +2 AC versus missile attacks.`,
    name: t`Shield`,
    points: EncumbranceUnit.Oversized,
    ruralCostCp: 250,
    type: ArmorType.Shield,
  },
  // NB: These bardings derive their points from the Mounts section (PCB p. 39)
  /*
  {
    armorClass: 14,
    categoryKey: 'armor',
    cityCostCp: 2500,
    name: t`Leather Barding`,
    points: EncumbranceUnit.Oversized,
    ruralCostCp: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 16,
    categoryKey: 'armor',
    cityCostCp: 5000,
    name: t`Chain Barding`,
    points: EncumbranceUnit.Heavy,
    ruralCostCp: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 18,
    categoryKey: 'armor',
    cityCostCp: 10000,
    name: t`Plate Barding`,
    points: EncumbranceUnit.Cumbersome,
    ruralCostCp: null,
    type: ArmorType.Barding,
  },

   */
]
