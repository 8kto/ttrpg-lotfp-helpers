import {EncumbrancePoint} from "@/shared/types/encumbrance"

export interface EquipmentItem {
  id: number;
  name: string;
  cityCost: number;
  ruralCost: number | null;
  points: EncumbrancePoint;
  isRecorded: boolean;
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
