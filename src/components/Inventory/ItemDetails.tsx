import { Trans } from '@lingui/macro'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import RangeFragment from '@/components/RangeFragment'
import type { ArmorItem } from '@/domain/armor'
import type { EquipmentItem } from '@/domain/equipment'
import type { InventoryItem } from '@/domain/inventory'
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

const isInventoryItem = <T extends EquipmentItem>(
  item: T,
): item is InventoryItem<T> => {
  return 'qty' in item
}

const QtyFragment = ({ item }: { item: InventoryItem<EquipmentItem> }) => {
  return <span className='text-red-300 text-sm'> (x{item.qty})</span>
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
  showDetailsBlock = false,
}: {
  item: T
  compact?: boolean
  showDetailsBlock?: boolean
}) => {
  const shouldShowDetails = showDetailsBlock || !!item.details

  if (shouldShowDetails) {
    return (
      <details className='ph-details-bullet text-gray-900'>
        <Summary item={item} compact={compact} />
        <Details item={item} />
      </details>
    )
  }

  const hasQty = isInventoryItem(item) && item.qty > 1

  return (
    <>
      {item.name}
      {hasQty && <QtyFragment item={item} />}
      {!compact && <ItemDetailsLine item={item} />}
    </>
  )
}

export default ItemDetails
