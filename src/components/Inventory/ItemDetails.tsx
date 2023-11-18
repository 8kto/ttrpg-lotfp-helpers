import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import type { EquipmentItem, InventoryItem } from '@/domain'
import type { ArmorItem } from '@/domain/armor'
import type { WeaponItem } from '@/domain/weapon'

const isArmorItem = (item: EquipmentItem): item is ArmorItem => {
  return 'armorClass' in item
}
const isWeaponItem = (item: EquipmentItem): item is WeaponItem => {
  return 'damage' in item && !!item.damage
}

const ItemDetails = <T extends InventoryItem<EquipmentItem>>({
  item,
}: {
  item: T
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
          {isArmorItem(item) ? <> (AC {item.armorClass})</> : null}
          {isWeaponItem(item) ? (
            <>
              {' '}
              (<DamageFragment damage={item.damage} />)
            </>
          ) : null}
        </div>
      </summary>
      <div className='py-4 text-gray-600'>
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
    item.name
  )
}

export default ItemDetails
