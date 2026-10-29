import { t } from '@lingui/macro'

import type { ArmorItem } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbranceUnit } from '@/domain/encumbrance'

const plusOne = { melee: 1, missile: 1 }

/**
 * Armor from the LotFP firearms rules (Early Modern period).
 * Weights follow the rulebook text.
 */
export const FirearmArmorItems = (): ReadonlyArray<ArmorItem> => [
  {
    armorClass: '+1',
    armorClassBonus: plusOne,
    categoryKey: 'armor',
    cityCostCp: 150,
    details: t`config.firearms.buffCoat.details`,
    name: t`Buff Coat`,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 300,
    type: ArmorType.Accessory,
  },
  {
    armorClass: 14,
    categoryKey: 'armor',
    cityCostCp: 500,
    details: t`config.firearms.pikemansArmor.details`,
    name: t`Pikeman's Armor`,
    points: EncumbranceUnit.Oversized,
    ruralCostCp: 1000,
    type: ArmorType.Armor,
  },
  {
    armorClass: '+1',
    armorClassBonus: plusOne,
    categoryKey: 'armor',
    cityCostCp: 250,
    details: t`config.firearms.tassets.details`,
    name: t`Tassets`,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 500,
    type: ArmorType.Accessory,
  },
  {
    armorClass: 18,
    categoryKey: 'armor',
    cityCostCp: 15000,
    details: t`config.firearms.fullArmor.details`,
    name: t`Full Armor`,
    points: EncumbranceUnit.Heavy,
    ruralCostCp: null,
    type: ArmorType.Armor,
  },
  {
    armorClass: '+1',
    armorClassBonus: plusOne,
    categoryKey: 'armor',
    cityCostCp: 250,
    name: t`Helm, Lobster Tail Pot`,
    physicalSaveBonus: 2,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 500,
    type: ArmorType.Accessory,
  },
  {
    armorClass: '+1',
    armorClassBonus: plusOne,
    categoryKey: 'armor',
    cityCostCp: 150,
    name: t`Helm, Morion`,
    physicalSaveBonus: 1,
    points: EncumbranceUnit.Regular,
    ruralCostCp: 300,
    type: ArmorType.Accessory,
  },
  {
    armorClass: '–',
    categoryKey: 'armor',
    cityCostCp: 50,
    details: t`config.firearms.secreteHelm.details`,
    name: t`Helm, Secrete`,
    physicalSaveBonus: 1,
    points: EncumbranceUnit.None,
    ruralCostCp: 100,
    type: ArmorType.Accessory,
  },
]
