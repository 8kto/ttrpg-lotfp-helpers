import { Trans } from '@lingui/macro'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import FirearmMechanismFragment from '@/components/FirearmMechanismFragment'
import FirearmRangeFragment from '@/components/FirearmRangeFragment'
import FirearmRulesFragment from '@/components/FirearmRulesFragment'
import {
  isArmorItem,
  isFirearmItem,
  isMissileItem,
  isWeaponItem,
} from '@/components/Inventory/ItemDetails/helpers'
import RangeFragment from '@/components/RangeFragment'
import type { EquipmentItem } from '@/domain/equipment'

export const Details = <T extends EquipmentItem>({ item }: { item: T }) => {
  const paragraphClassname = ''

  return (
    <div className='space-y-3 text-gray-600'>
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

      {/* Firearms weapons */}
      {isFirearmItem(item) ? (
        <>
          <p className={paragraphClassname} data-testid='details--mechanism'>
            <strong>
              <Trans>Firearm mechanism</Trans>
            </strong>
            : <FirearmMechanismFragment item={item} />
          </p>
          {!!item.damageMelee && (
            <p
              className={paragraphClassname}
              data-testid='details--damage-melee'
            >
              <strong>
                <Trans>Mêlée damage</Trans>
              </strong>
              : <DamageFragment damage={item.damageMelee} />
            </p>
          )}
          <div className={paragraphClassname} data-testid='details--firearms'>
            <strong>
              <Trans>Range</Trans>
            </strong>
            <FirearmRangeFragment range={item.range} isRifled={item.isRifled} />
            <p className='ph-color-muted text-sm'>
              <Trans>
                Dexterity to-hit modifiers do not apply at Medium and Long
                range.
              </Trans>
            </p>
          </div>
          <FirearmRulesFragment
            item={item}
            paragraphClassname={paragraphClassname}
          />
        </>
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
