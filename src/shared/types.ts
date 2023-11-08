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

export interface EquipmentItem {
  id: number;
  name: string;
  cityCost: number;
  ruralCost: number | null;
  points: EncumbrancePoint;
  isRecorded: boolean;
}

export interface ArmorEntry extends EquipmentItem {
  type: ArmorType;
  armorClass: number | string;
}

export enum Encumbrance {
  Unencumbered = 'Unencumbered',
  Lightly = 'Lightly',
  Heavily = 'Heavily',
  Severely = 'Severely',
  OverEncumbered = 'OverEncumbered'
}