import type { ArmorEntry } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'

export const Armor: ReadonlyArray<ArmorEntry> = [
  {
    armorClass: 14,
    cityCost: 25,
    name: 'Leather',
    points: EncumbrancePoint.None,
    ruralCost: 50,
    type: ArmorType.Armor,
  },
  {
    armorClass: 16,
    cityCost: 100,
    name: 'Chain',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: 18,
    cityCost: 1000,
    name: 'Plate',
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: '+1,+2',
    cityCost: 10,
    name: 'Shield',
    points: EncumbrancePoint.Oversized,
    ruralCost: 25,
    type: ArmorType.Shield,
  },
  {
    armorClass: 14,
    cityCost: 250,
    name: 'Leather Barding',
    points: EncumbrancePoint.None,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 16,
    cityCost: 500,
    name: 'Chain Barding',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  {
    armorClass: 18,
    cityCost: 1000,
    name: 'Plate Barding',
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Barding,
  },
]
