import {EquipmentItem} from "@/shared/types/index"

export enum ArmorType {
  Armor = 'Armor',
  Barding = 'Barding',
  Shield = 'Shield'
}

export interface ArmorEntry extends EquipmentItem {
  type: ArmorType;
  armorClass: number | string;
}
