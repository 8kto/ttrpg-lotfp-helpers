import {Dice, EquipmentItem} from "@/shared/types/index"

export enum WeaponType {
  Great,
  Medium,
  Minor,
  Small
}

export type Range = number

export interface WeaponEntry extends EquipmentItem {
  damage: DamageDice | null;
  range: Range;
  isAbleToReceiveCharge?: boolean;
  twoHanded?: boolean
  isSecondRank?: boolean
}

export type DamageDice = {
  x: number;
  dice: Dice
}