import {ArmorEntry, ArmorType} from "@/shared/types/armor"
import {EncumbrancePoint} from "@/shared/types/encumbrance"

export const Armor: Record<number, ArmorEntry> = {
  1: {
    id: 1,
    name: "Leather",
    type: ArmorType.Armor,
    cityCost: 25,
    ruralCost: 50,
    armorClass: 14,
    points: EncumbrancePoint.None,
    isRecorded: false,
  },
  2: {
    id: 2,
    name: "Chain",
    type: ArmorType.Armor,
    cityCost: 100,
    ruralCost: null,
    armorClass: 16,
    points: EncumbrancePoint.Oversized,
    isRecorded: false,
  },
  3: {
    id: 3,
    name: "Plate",
    type: ArmorType.Armor,
    cityCost: 1000,
    ruralCost: null,
    armorClass: 18,
    points: EncumbrancePoint.Heavy,
    isRecorded: false,
  },
  4: {
    id: 4,
    name: "Shield",
    type: ArmorType.Shield,
    cityCost: 10,
    ruralCost: 25,
    armorClass: '+1,+2',
    points: EncumbrancePoint.Oversized,
    isRecorded: false,
  },
  5: {
    id: 5,
    name: "Leather Barding",
    type: ArmorType.Barding,
    cityCost: 250,
    ruralCost: null,
    armorClass: 14,
    points: EncumbrancePoint.None,
    isRecorded: false,
  },
  6: {
    id: 6,
    name: "Chain Barding",
    type: ArmorType.Barding,
    cityCost: 500,
    ruralCost: null,
    armorClass: 16,
    points: EncumbrancePoint.Oversized,
    isRecorded: false,
  },
  7: {
    id: 7,
    name: "Plate Barding",
    type: ArmorType.Barding,
    cityCost: 1000,
    ruralCost: null,
    armorClass: 18,
    points: EncumbrancePoint.Heavy,
    isRecorded: false,
  },
}