import type { EncumbrancePoint } from '@/domain/encumbrance'

export interface EquipmentItem {
  name: string
  cityCost: number
  ruralCost: number | null
  points: EncumbrancePoint
  details?: string
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
