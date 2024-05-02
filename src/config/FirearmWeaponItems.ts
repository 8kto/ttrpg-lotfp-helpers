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
    details: t`Pistols are about the size of a man’s forearm and require one hand to fire. Pistols never use the matchlock firing mechanism. Can be used as a mêlée weapon (d4 damage).`,
    firingMechanism: FiringMechanism.Wheellock,
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
    details: t`Arquebus is a handheld long gun which does not require a fork rest in order to fire properly. Can be used as a mêlée weapon (d6 damage).`,
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
    details: t`Musket is a large handheld long gun which requires a fork rest in order to fire; not having the rest levies a –2 penalty to hit. Can be used as a mêlée weapon (d6 damage).`,
    firingMechanism: FiringMechanism.Matchlock,
    isRiffled: false,
    isTwoHanded: true,
    name: t`Musket`,
    points: EncumbranceUnit.Oversized,
    range: { long: 600, medium: 100, short: 50 },
    ruralCostCp: 800,
    type: WeaponType.Firearms,
  },
  {
    categoryKey: 'firearmWeapons',
    cityCostCp: 500,
    damage: { dice: Dice.d8, x: 1 },
    damageMelee: { dice: Dice.d4, x: 1 },
    details: `${t`Brace of two pistols.`} ${t`Pistols are about the size of a man’s forearm and require one hand to fire. Pistols never use the matchlock firing mechanism. Can be used as a mêlée weapon (d4 damage).`}`,
    firingMechanism: FiringMechanism.Wheellock,
    isRiffled: false,
    isTwoHanded: false,
    name: t`Pistol brace`,
    points: EncumbranceUnit.Regular,
    range: { long: 100, medium: 50, short: 25 },
    ruralCostCp: 1000,
    type: WeaponType.Firearms,
  },
]

// TODO display Two handed for melee and firearms in equipment grids
