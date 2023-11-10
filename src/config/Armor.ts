import type { ArmorEntry } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'

export const Armor: Record<number, ArmorEntry> = {
  1: {
    armorClass: 14,
    cityCost: 25,
    id: 1,
    name: 'Leather',
    points: EncumbrancePoint.None,
    ruralCost: 50,
    type: ArmorType.Armor,
  },
  2: {
    armorClass: 16,
    cityCost: 100,
    id: 2,
    name: 'Chain',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  3: {
    armorClass: 18,
    cityCost: 1000,
    id: 3,
    name: 'Plate',
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Armor,
  },
  4: {
    armorClass: '+1,+2',
    cityCost: 10,
    id: 4,
    name: 'Shield',
    points: EncumbrancePoint.Oversized,
    ruralCost: 25,
    type: ArmorType.Shield,
  },
  5: {
    armorClass: 14,
    cityCost: 250,
    id: 5,
    name: 'Leather Barding',
    points: EncumbrancePoint.None,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  6: {
    armorClass: 16,
    cityCost: 500,
    id: 6,
    name: 'Chain Barding',
    points: EncumbrancePoint.Oversized,
    ruralCost: null,
    type: ArmorType.Barding,
  },
  7: {
    armorClass: 18,
    cityCost: 1000,
    id: 7,
    name: 'Plate Barding',
    points: EncumbrancePoint.Heavy,
    ruralCost: null,
    type: ArmorType.Barding,
  },
}
