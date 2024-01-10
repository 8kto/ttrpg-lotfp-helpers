import { Trans } from '@lingui/macro'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import {
  isArmorItem,
  isMissileItem,
  isWeaponItem,
} from '@/components/Inventory/ItemDetails/helpers'
import RangeFragment from '@/components/RangeFragment'
import type { EquipmentItem } from '@/domain/equipment'

export const Details = <T extends EquipmentItem>({ item }: { item: T }) => {
  const paragraphClassname = ''

  return (
    <div className='text-gray-600 space-y-3'>
      {/* Armor */}
      {isArmorItem(item) ? (
        <p className={paragraphClassname} data-testid='details--ac'>
          <Trans>Armor Class</Trans>: {item.armorClass}
        </p>
      ) : null}

      {/* All weapons */}
      {isWeaponItem(item) ? (
        <p className={paragraphClassname} data-testid='details--damage'>
          <strong>
            <Trans>Damage</Trans>
          </strong>
          : <DamageFragment damage={item.damage} />
        </p>
      ) : null}

      {/* Missile weapons */}
      {isMissileItem(item) ? (
        <div className={paragraphClassname} data-testid='details--range'>
          <strong>
            <Trans>Range</Trans>
          </strong>
          <RangeFragment range={item.range} />
        </div>
      ) : null}

      {/* All items */}
      {!!item.details ? (
        <p
          data-testid='details--details'
          className={paragraphClassname}
          dangerouslySetInnerHTML={{ __html: item.details }}
        />
      ) : null}
    </div>
  )
}
