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

export enum Dice {
  d2 = 'd2',
  d3 = 'd3',
  d4 = 'd4',
  d6 = 'd6',
  d8 = 'd8',
  d10 = 'd10',
  d12 = 'd12',
  d20 = 'd20',
  d100 = 'd100',
}

export type DamageDice = {
  multiplier: number;
  dice: Dice
}

export interface WeaponEntry extends EquipmentItem {
  damage: DamageDice | null;
}

export enum Encumbrance {
  Unencumbered = 'Unencumbered',
  Lightly = 'Lightly',
  Heavily = 'Heavily',
  Severely = 'Severely',
  OverEncumbered = 'OverEncumbered'
}