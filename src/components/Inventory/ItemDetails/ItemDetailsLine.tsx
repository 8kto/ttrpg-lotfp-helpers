import { Trans } from '@lingui/macro'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import {
  isArmorItem,
  isWeaponItem,
} from '@/components/Inventory/ItemDetails/helpers'
import type { EquipmentItem } from '@/domain/equipment'

const ItemDetailsLine = <T extends EquipmentItem>({ item }: { item: T }) => {
  const detailsClassname = 'ml-1 text-gray-500'

  return (
    <>
      {isArmorItem(item) ? (
        <span className={detailsClassname}>
          (<Trans>AC</Trans> {item.armorClass})
        </span>
      ) : null}
      {isWeaponItem(item) ? (
        <span className={detailsClassname}>
          (<DamageFragment damage={item.damage} />)
        </span>
      ) : null}
    </>
  )
}

export default ItemDetailsLine
