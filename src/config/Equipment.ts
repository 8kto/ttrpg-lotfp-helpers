import {
  ArmorItems,
  MeleeWeaponItems,
  MiscEquipmentItems,
  MissileWeaponItems,
} from '@/config'
import { FirearmWeaponItems } from '@/config/FirearmWeaponItems'
import type { ArmorItem } from '@/domain/armor'
import type { EquipmentItem } from '@/domain/equipment'
import type {
  FirearmWeaponItem,
  MeleeWeaponItem,
  MissileWeaponItem,
} from '@/domain/weapon'
import deepclone from '@/shared/helpers/deepclone'

/**
 * Utilizes getters for each equipment category (ArmorItems, MeleeWeapons, etc.)
 * to enable real-time translation when the locale changes.
 */
const Equipment = {
  get Armor(): ReadonlyArray<ArmorItem> {
    return deepclone(ArmorItems())
  },

  get FirearmWeapons(): ReadonlyArray<FirearmWeaponItem> {
    return deepclone(FirearmWeaponItems())
  },

  get MeleeWeapons(): ReadonlyArray<MeleeWeaponItem> {
    return deepclone(MeleeWeaponItems())
  },

  get MiscEquipment(): ReadonlyArray<EquipmentItem> {
    return deepclone(MiscEquipmentItems())
  },

  get MissileWeapons(): ReadonlyArray<MissileWeaponItem> {
    return deepclone(MissileWeaponItems())
  },
}

export default Equipment
