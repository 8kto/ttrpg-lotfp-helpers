import { t } from '@lingui/macro'

import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'

export const Armor: ReadonlyArray<ArmorItem> = [
  {
    armorClass: 14,
    cityCost: 25,
    get name() {
      return t`Leather`
    },
    points: EncumbrancePoint.None,
    ruralCost: 50,
    type: ArmorType.Armor,
  },
  {
    armorClass: 16,
    cityCost: 100,
    get name() {
      return t`Chain`
    },
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: 18,
    cityCost: 1000,
    get details() {
      return t`Explorers traveling ... with ... metal armor clomping on stone floors are not going to surprise anything or anyone (PCB p.56).`
    },
    get name() {
      return t`Plate`
    },
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: '+1,+2',
    cityCost: 10,
    get details() {
      return t`+1 AC versus mêlée attacks, +2 AC versus missile attacks.`
    },
    get name() {
      return t`Shield`
    },
    points: EncumbrancePoint.Oversized,
    ruralCost: 25,
    type: ArmorType.Shield,
  },
  {
    armorClass: 14,
    cityCost: 250,
    get name() {
      return t`Leather Barding`
    },
    points: EncumbrancePoint.None,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 16,
    cityCost: 500,
    get name() {
      return t`Chain Barding`
    },
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 18,
    cityCost: 1000,
    get name() {
      return t`Plate Barding`
    },
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Barding,
  },
]
