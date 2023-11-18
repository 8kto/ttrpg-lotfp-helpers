import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import type { InventoryColumn } from '@/components/Inventory/InventoryGrid'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import type { InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { removeMeleeWeapon, useInventoryState } from '@/state/InventoryState'

type MeleeWeaponInventoryItem = InventoryItem<MeleeWeaponItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<MeleeWeaponInventoryItem>
> = [
  {
    className: 'w-1/2 truncate',
    key: 'name',
    render: (item: MeleeWeaponItem) => (
      <details className='ph-details-bullet'>
        <summary className='cursor-pointer list-none truncate p-4 pl-0'>
          <div className='flex items-center'>
            <span className='ph-custom-indicator mr-2 text-gray-400'>
              &#9654;
            </span>
            {item.name}{' '}
            {item.damage ? (
              <>
                (<DamageFragment damage={item.damage} />)
              </>
            ) : (
              ''
            )}
          </div>
        </summary>
        <div className='pb-4'>
          <p>
            Damage: <DamageFragment damage={item.damage} />
          </p>
          <p>{item.details}</p>
        </div>
      </details>
    ),
    title: 'Name',
  },
  {
    className: 'w-1/6',
    key: 'lockedCost',
    title: 'Cost',
  },
  {
    className: 'w-1/6',
    key: 'points',
    render: (item) => {
      return EncumbrancePoint[item.points]
    },
    title: 'Weight',
  },
]

const MeleeWeaponsInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { meleeWeapons } = equipmentState

  const onRemoveClick = (item: MeleeWeaponInventoryItem) =>
    removeMeleeWeapon(item)

  return (
    <InventoryGrid<MeleeWeaponInventoryItem>
      data={meleeWeapons.get()}
      columns={inventoryTableColumns}
      onRemoveClick={onRemoveClick}
    />
  )
}

export default MeleeWeaponsInventoryGrid
