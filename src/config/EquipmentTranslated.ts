import type { I18n } from '@lingui/core'

import type { EquipmentItemTranslated } from '@/config/types'
import type { EquipmentItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { MeleeWeaponItem, MissileWeaponItem } from '@/domain/weapon'
import deepclone from '@/shared/helpers/deepclone'
import type { EquipmentCategoryKey } from '@/state/InventoryState'

import { Armor } from './Armor'
import { MeleeWeapons } from './MeleeWeapons'
import { MiscEquipment } from './MiscEquipment'
import { MissileWeapons } from './MissileWeapons'

export default class EquipmentTranslated {
  private readonly trans: I18n['_']

  constructor(trans: I18n['_']) {
    this.trans = trans
  }

  private translate<T>(
    items: ReadonlyArray<EquipmentItemTranslated<T>>,
    categoryKey: EquipmentCategoryKey,
  ): ReadonlyArray<T> {
    return items.map((item) => {
      return {
        ...item,
        categoryKey,
        details: item.details ? this.trans(item.details) : undefined,
        name: typeof item.name === 'object' ? this.trans(item.name) : item.name,
      } as T
    })
  }

  get Armor(): ReadonlyArray<ArmorItem> {
    return this.translate<ArmorItem>(deepclone(Armor), 'armor')
  }

  get MeleeWeapons(): ReadonlyArray<MeleeWeaponItem> {
    return this.translate<MeleeWeaponItem>(
      deepclone(MeleeWeapons),
      'meleeWeapons',
    )
  }

  get MissileWeapons(): ReadonlyArray<MissileWeaponItem> {
    return this.translate<MissileWeaponItem>(
      deepclone(MissileWeapons),
      'missileWeapons',
    )
  }

  get MiscEquipment(): ReadonlyArray<EquipmentItem> {
    return this.translate<EquipmentItem>(
      deepclone(MiscEquipment),
      'miscEquipment',
    )
  }
}
