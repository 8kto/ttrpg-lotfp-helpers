import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import type { InventoryColumn } from '@/components/Inventory/InventoryGrid'
import InventoryGrid from '@/components/Inventory/InventoryGrid'
import type { InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MissileWeaponItem } from '@/domain/weapon'
import { removeMissileWeapon, useInventoryState } from '@/state/InventoryState'

type MissileWeaponInventoryItem = InventoryItem<MissileWeaponItem>

const inventoryTableColumns: ReadonlyArray<
  InventoryColumn<MissileWeaponInventoryItem>
> = [
  {
    className: 'w-1/2 truncate',
    key: 'name',
    render: (item: MissileWeaponItem) => (
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

const MissileWeaponsInventoryGrid = () => {
  const { state: equipmentState } = useInventoryState()
  const { missileWeapons } = equipmentState

  const onRemoveClick = (item: InventoryItem<MissileWeaponItem>) =>
    removeMissileWeapon(item)

  return (
    <InventoryGrid<MissileWeaponInventoryItem>
      data={missileWeapons.get()}
      columns={inventoryTableColumns}
      onRemoveClick={onRemoveClick}
    />
  )
}

export default MissileWeaponsInventoryGrid
