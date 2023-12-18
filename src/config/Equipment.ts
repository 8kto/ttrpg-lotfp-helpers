import { Armor, MeleeWeapons, MiscEquipment, MissileWeapons } from '@/config'
import type { ArmorItem } from '@/domain/armor'
import type { EquipmentItem } from '@/domain/equipment'
import type { MeleeWeaponItem, MissileWeaponItem } from '@/domain/weapon'
// TODO use for other case
import deepclone from '@/shared/helpers/deepclone'

/**
 * Utilizes getters for each equipment category (Armor, MeleeWeapons, etc.)
 * to enable real-time translation when the locale changes.
 */
const Equipment = {
  get Armor(): ReadonlyArray<ArmorItem> {
    return deepclone(Armor())
  },

  get MeleeWeapons(): ReadonlyArray<MeleeWeaponItem> {
    return deepclone(MeleeWeapons())
  },

  get MiscEquipment(): ReadonlyArray<EquipmentItem> {
    return deepclone(MiscEquipment())
  },

  get MissileWeapons(): ReadonlyArray<MissileWeaponItem> {
    return deepclone(MissileWeapons())
  },
}

export default Equipment
