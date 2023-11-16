import deepclone from '@/shared/helpers/deepclone'

import { Armor } from './Armor'
import { MeleeWeapons } from './MeleeWeapons'
import { MissileWeapons } from './MissileWeapons'

export const Equipment = deepclone({
  Armor,
  MeleeWeapons,
  MissileWeapons,
})
