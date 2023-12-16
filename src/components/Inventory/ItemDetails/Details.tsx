import { Trans } from '@lingui/macro'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import {
  isArmorItem,
  isInventoryItem,
  isMissileItem,
  isWeaponItem,
} from '@/components/Inventory/ItemDetails/helpers'
import ItemDetailsLine from '@/components/Inventory/ItemDetails/ItemDetailsLine'
import QtyFragment from '@/components/Inventory/ItemDetails/QtyFragment'
import RangeFragment from '@/components/RangeFragment'
import type { EquipmentItem } from '@/domain/equipment'

export const Summary = <T extends EquipmentItem>({
  item,
  compact = false,
}: {
  item: T
  compact?: boolean
}) => {
  const hasQty = isInventoryItem(item) && item.qty > 1

  return (
    <summary className='cursor-pointer list-none'>
      <div className='flex items-center'>
        <span className='ph-dashed-text'>
          {item.name}
          {hasQty && <QtyFragment item={item} />}
          {!compact && <ItemDetailsLine item={item} />}
        </span>
      </div>
    </summary>
  )
}

export const Details = <T extends EquipmentItem>({ item }: { item: T }) => {
  const paragraphClassname = 'mb-2'

  return (
    <div className='pt-4 text-gray-600'>
      {isArmorItem(item) ? (
        <p className={paragraphClassname}>
          <Trans>Armor Class</Trans>: {item.armorClass}
        </p>
      ) : null}
      {/* All weapons */}
      {isWeaponItem(item) ? (
        <p className={paragraphClassname}>
          <strong>
            <Trans>Damage</Trans>
          </strong>
          : <DamageFragment damage={item.damage} />
        </p>
      ) : null}

      {/* Missile weapons */}
      {isMissileItem(item) ? (
        <div className={paragraphClassname}>
          <strong>
            <Trans>Range</Trans>
          </strong>
          <RangeFragment range={item.range} />
        </div>
      ) : null}

      {/* All items */}
      {!!item.details ? (
        <p
          className={paragraphClassname}
          dangerouslySetInnerHTML={{ __html: item.details }}
        />
      ) : null}
    </div>
  )
}
