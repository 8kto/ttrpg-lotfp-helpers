import { MinusCircleIcon as MinusIcon } from '@heroicons/react/24/solid'
import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import type { InventoryItem } from '@/domain'
import { EncumbrancePoint } from '@/domain/encumbrance'
import type { MeleeWeaponItem } from '@/domain/weapon'
import { removeMeleeWeapon, useInventoryState } from '@/state/InventoryState'

const MeleeWeaponsInventory = () => {
  const { state: equipmentState } = useInventoryState()
  const { meleeWeapons } = equipmentState

  const onRemoveClick = (item: InventoryItem<MeleeWeaponItem>) =>
    removeMeleeWeapon(item)

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`
  const cellClassnames = `px-4 text-sm font-normal text-gray-900`

  return (
    <table className='w-full table-fixed'>
      <thead className='bg-gray-50 dark:bg-gray-700'>
        <tr>
          <th scope='col' className={`${headerCellClassnames} w-1/2 truncate`}>
            Name
          </th>
          <th scope='col' className={`${headerCellClassnames} w-1/6`}>
            Cost
          </th>
          <th scope='col' className={`${headerCellClassnames} w-1/6`}>
            Weight
          </th>
          <th scope='col' className={`${headerCellClassnames} w-1/6`}></th>
        </tr>
      </thead>
      <tbody className='bg-white dark:bg-gray-800'>
        {meleeWeapons.get().map((item, index) => (
          <tr key={item.inventoryId} className={index % 2 ? 'bg-gray-50' : ''}>
            <td className={`${cellClassnames} truncate`}>
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
                  <>{item.details}</>
                  <ul className='ml-4 list-disc pl-4'>
                    <li>
                      Damage: (<DamageFragment damage={item.damage} />)
                    </li>
                  </ul>
                </div>
              </details>
            </td>
            <td className={cellClassnames}>
              {item.cityCost !== undefined ? item.cityCost : item.ruralCost}
            </td>
            <td className={cellClassnames}>{EncumbrancePoint[item.points]}</td>
            <td className={cellClassnames}>
              <button
                className='inline-flex items-center text-xs text-gray-500'
                onClick={() => onRemoveClick(item)}
                title='Remove item'
              >
                <MinusIcon className='mr-2 h-5 w-5' />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MeleeWeaponsInventory
