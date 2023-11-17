import type { ArmorItem } from '@/domain/armor'
import type { MeleeWeaponItem, MissileWeaponItem } from '@/domain/weapon'
import deepclone from '@/shared/helpers/deepclone'

import { Armor } from './Armor'
import { MeleeWeapons } from './MeleeWeapons'
import { MissileWeapons } from './MissileWeapons'

type Equipment = {
  MissileWeapons: ReadonlyArray<MissileWeaponItem>
  Armor: ReadonlyArray<ArmorItem>
  MeleeWeapons: ReadonlyArray<MeleeWeaponItem>
}

export const AllEquipment: Readonly<Equipment> = deepclone({
  Armor,
  MeleeWeapons,
  MissileWeapons,
})
