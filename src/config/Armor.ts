import { msg } from '@lingui/macro'

import type { EquipmentItemTranslated } from '@/config/types'
import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'

export const Armor: ReadonlyArray<EquipmentItemTranslated<ArmorItem>> = [
  {
    armorClass: 14,
    cityCost: 25,
    name: msg`Leather`,
    points: EncumbrancePoint.None,
    ruralCost: 50,
    type: ArmorType.Armor,
  },
  {
    armorClass: 16,
    cityCost: 100,
    name: msg`Chain`,
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: 18,
    cityCost: 1000,
    details: msg`config.armor.plate.details`,
    name: msg`Plate`,
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: '+1,+2',
    cityCost: 10,
    details: msg`+1 AC versus mêlée attacks, +2 AC versus missile attacks.`,
    name: msg`Shield`,
    points: EncumbrancePoint.Oversized,
    ruralCost: 25,
    type: ArmorType.Shield,
  },
  {
    armorClass: 14,
    cityCost: 250,
    name: msg`Leather Barding`,
    points: EncumbrancePoint.None,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 16,
    cityCost: 500,
    name: msg`Chain Barding`,
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 18,
    cityCost: 1000,
    name: msg`Plate Barding`,
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Barding,
  },
]
