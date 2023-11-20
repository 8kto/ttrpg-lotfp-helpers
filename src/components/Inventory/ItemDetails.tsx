import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import RangeFragment from '@/components/RangeFragment'
import type { EquipmentItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { MissileWeaponItem, WeaponItem } from '@/domain/weapon'
import { t } from '@/locale/helpers'

const isArmorItem = (item: EquipmentItem): item is ArmorItem => {
  return 'armorClass' in item
}
const isWeaponItem = (item: EquipmentItem): item is WeaponItem => {
  return 'damage' in item && !!item.damage
}
const isMissileItem = (item: EquipmentItem): item is MissileWeaponItem => {
  return 'range' in item && !!item.range
}

const ItemDetails = <T extends EquipmentItem>({
  item,
  compact = false,
}: {
  item: T
  compact?: boolean
}) => {
  const paragraphClassname = 'mb-2'

  return item.details ? (
    <details className='ph-details-bullet text-gray-900'>
      <summary className='cursor-pointer list-none'>
        <div className='flex items-center'>
          <span className='ph-custom-indicator mr-2 text-gray-400'>
            &#9654;
          </span>
          {/* Title */}
          {item.name}
          {!compact && (
            <>
              {isArmorItem(item) ? (
                <>
                  {' '}
                  ({t('AC')} {item.armorClass})
                </>
              ) : null}
              {isWeaponItem(item) ? (
                <>
                  {' '}
                  (<DamageFragment damage={item.damage} />)
                </>
              ) : null}
            </>
          )}
        </div>
      </summary>
      {/* Item details unfold */}
      <div className='pt-4 text-gray-600'>
        {isArmorItem(item) ? (
          <p className={paragraphClassname}>Armor Class: {item.armorClass}</p>
        ) : null}
        {isWeaponItem(item) ? (
          <p className={paragraphClassname}>
            <strong>{t('Damage')}</strong>:{' '}
            <DamageFragment damage={item.damage} />
          </p>
        ) : null}
        {isMissileItem(item) ? (
          <div className={paragraphClassname}>
            <strong>{t('Range')}</strong>
            <RangeFragment range={item.range} />
          </div>
        ) : null}
        <p className={paragraphClassname}>{item.details}</p>
      </div>
    </details>
  ) : (
    <>
      {item.name}
      {!compact && (
        <>
          {isArmorItem(item) ? <> (AC {item.armorClass})</> : null}
          {isWeaponItem(item) ? (
            <>
              {' '}
              (<DamageFragment damage={item.damage} />)
            </>
          ) : null}
        </>
      )}
    </>
  )
}

export default ItemDetails
