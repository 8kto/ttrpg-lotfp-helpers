import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import type { EquipmentItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { WeaponItem } from '@/domain/weapon'

const isArmorItem = (item: EquipmentItem): item is ArmorItem => {
  return 'armorClass' in item
}
const isWeaponItem = (item: EquipmentItem): item is WeaponItem => {
  return 'damage' in item && !!item.damage
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
        </div>
      </summary>
      <div className='pt-4 text-gray-600'>
        {isArmorItem(item) ? (
          <p className={paragraphClassname}>Armor Class: {item.armorClass}</p>
        ) : null}
        {isWeaponItem(item) ? (
          <p className={paragraphClassname}>
            Damage: <DamageFragment damage={item.damage} />
          </p>
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
