import { t } from '@lingui/macro'

import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'

export const ArmorItems = (): ReadonlyArray<ArmorItem> => [
  {
    armorClass: 14,
    categoryKey: 'armor',
    cityCost: 25,
    name: t`Leather`,
    points: EncumbrancePoint.None,
    ruralCost: 50,
    type: ArmorType.Armor,
  },
  {
    armorClass: 16,
    categoryKey: 'armor',
    cityCost: 100,
    name: t`Chain`,
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: 18,
    categoryKey: 'armor',
    cityCost: 1000,
    details: t`config.armor.plate.details`,
    name: t`Plate`,
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: '+1,+2',
    categoryKey: 'armor',
    cityCost: 10,
    details: t`+1 AC versus mêlée attacks, +2 AC versus missile attacks.`,
    name: t`Shield`,
    points: EncumbrancePoint.Oversized,
    ruralCost: 25,
    type: ArmorType.Shield,
  },
  {
    armorClass: 14,
    categoryKey: 'armor',
    cityCost: 250,
    name: t`Leather Barding`,
    points: EncumbrancePoint.None,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 16,
    categoryKey: 'armor',
    cityCost: 500,
    name: t`Chain Barding`,
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 18,
    categoryKey: 'armor',
    cityCost: 1000,
    name: t`Plate Barding`,
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Barding,
  },
]
