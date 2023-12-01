import type { I18n } from '@lingui/core'

import type { EquipmentItemTranslated } from '@/config/types'
import type { EquipmentItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { MeleeWeaponItem, MissileWeaponItem } from '@/domain/weapon'
import deepclone from '@/shared/helpers/deepclone'

import { Armor } from './Armor'
import { MeleeWeapons } from './MeleeWeapons'
import { MiscEquipment } from './MiscEquipment'
import { MissileWeapons } from './MissileWeapons'

type Equipment = {
  MissileWeapons: ReadonlyArray<MissileWeaponItem>
  Armor: ReadonlyArray<EquipmentItemTranslated<ArmorItem>>
  MeleeWeapons: ReadonlyArray<EquipmentItemTranslated<MeleeWeaponItem>>
  MiscEquipment: ReadonlyArray<EquipmentItem>
}

export default class EquipmentTranslated {
  private i18n: I18n

  constructor(i18n: I18n) {
    this.i18n = i18n
  }

  translate<T>(
    items: ReadonlyArray<EquipmentItemTranslated<T>>,
  ): ReadonlyArray<T> {
    return items.map((item) => {
      return {
        ...item,
        details: item.details ? this.i18n._(item.details) : undefined,
        name: this.i18n._(item.name),
      } as T
    })
  }

  get Armor(): ReadonlyArray<ArmorItem> {
    return this.translate<ArmorItem>(deepclone(Armor))
  }

  get MeleeWeapons(): ReadonlyArray<MeleeWeaponItem> {
    return this.translate(deepclone(MeleeWeapons))
  }
}

export const AllEquipment: Readonly<Equipment> = {
  Armor,
  MeleeWeapons,
  MiscEquipment,
  MissileWeapons,
}
