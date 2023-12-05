import { Trans } from '@lingui/macro'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import RangeFragment from '@/components/RangeFragment'
import type { EquipmentItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { MissileWeaponItem, WeaponItem } from '@/domain/weapon'

const isArmorItem = (item: EquipmentItem): item is ArmorItem => {
  return 'armorClass' in item
}
const isWeaponItem = (item: EquipmentItem): item is WeaponItem => {
  return 'damage' in item && !!item.damage
}
const isMissileItem = (item: EquipmentItem): item is MissileWeaponItem => {
  return 'range' in item && !!item.range
}

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

const Summary = <T extends EquipmentItem>({
  item,
  compact = false,
}: {
  item: T
  compact?: boolean
}) => {
  return (
    <summary className='cursor-pointer list-none'>
      <div className='flex items-center'>
        <span className='ph-custom-indicator mr-1 text-gray-300'>&#9654;</span>
        {item.name}
        {!compact && <ItemDetailsLine item={item} />}
      </div>
    </summary>
  )
}

const Details = <T extends EquipmentItem>({ item }: { item: T }) => {
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

const ItemDetails = <T extends EquipmentItem>({
  item,
  compact = false,
}: {
  item: T
  compact?: boolean
}) => {
  if (item.details) {
    return (
      <details className='ph-details-bullet text-gray-900'>
        <Summary item={item} compact={compact} />
        <Details item={item} />
      </details>
    )
  }

  return (
    <>
      {item.name}
      {!compact && <ItemDetailsLine item={item} />}
    </>
  )
}

export default ItemDetails
