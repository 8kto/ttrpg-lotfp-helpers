export enum ArmorType {
  Armor = 'Armor',
  Barding = 'Barding',
  Shield = 'Shield'
}

export enum EncumbrancePoint {
  None = 0,
  Regular = 0.2,
  Oversized = 1,
  Heavy = 2
}

interface EquipmentItem {
  id: number;
  name: string;
  cityCost: number;
  ruralCost: number | null;
  weight: EncumbrancePoint;
  isRecorded: boolean;
}

export interface ArmorEntry extends EquipmentItem {
  type: ArmorType;
  armorClass: number | string;
}
