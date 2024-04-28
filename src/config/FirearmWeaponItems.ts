import { t } from '@lingui/macro'

import { Dice } from '@/domain'
import { EncumbranceUnit } from '@/domain/encumbrance'
import { FiringMechanism } from '@/domain/firearms'
import type { FirearmWeaponItem } from '@/domain/weapon'
import { WeaponType } from '@/domain/weapon'

export const FirearmWeaponItems = (): ReadonlyArray<FirearmWeaponItem> => [
  {
    categoryKey: 'firearmWeapons',
    cityCostCp: 250,
    damage: { dice: Dice.d8, x: 1 },
    damageMelee: { dice: Dice.d4, x: 1 },
    details: t`TODO`,
    firingMechanism: FiringMechanism.Matchlock,
    isRiffled: false,
    isTwoHanded: false,
    name: t`Pistol`,
    points: EncumbranceUnit.Regular,
    range: { long: 100, medium: 50, short: 25 },
    ruralCostCp: 500,
    type: WeaponType.Firearms,
  },
  {
    categoryKey: 'firearmWeapons',
    cityCostCp: 300,
    damage: { dice: Dice.d8, x: 1 },
    damageMelee: { dice: Dice.d6, x: 1 },
    details: t`TODO`,
    firingMechanism: FiringMechanism.Matchlock,
    isRiffled: false,
    isTwoHanded: true,
    name: t`Arquebus`,
    points: EncumbranceUnit.Regular,
    range: { long: 600, medium: 100, short: 50 },
    ruralCostCp: 500,
    type: WeaponType.Firearms,
  },
  {
    categoryKey: 'firearmWeapons',
    cityCostCp: 400,
    damage: { dice: Dice.d8, x: 1 },
    damageMelee: { dice: Dice.d6, x: 1 },
    details: t`TODO`,
    firingMechanism: FiringMechanism.Matchlock,
    isRiffled: false,
    isTwoHanded: true,
    name: t`Musket`,
    points: EncumbranceUnit.Oversized,
    range: { long: 600, medium: 100, short: 50 },
    ruralCostCp: 800,
    type: WeaponType.Firearms,
  },
]
