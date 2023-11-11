import React from 'react'

import DamageFragment from '@/components/DamageFragment'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { useInventoryState } from '@/state/InventoryState'

const WeaponsInventory = () => {
  const { state: equipmentState } = useInventoryState()
  const { weapons } = equipmentState

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase`
  const cellClassnames = `px-4 text-sm font-normal text-gray-900`

  return (
    <table className='w-full table-fixed'>
      <thead className='bg-gray-50 dark:bg-gray-700'>
        <tr>
          <th scope='col' className={`${headerCellClassnames} w-2/3 truncate`}>
            Name
          </th>
          <th scope='col' className={`${headerCellClassnames} w-1/4`}>
            Cost
          </th>
          <th scope='col' className={`${headerCellClassnames} w-1/4`}>
            Weight
          </th>
        </tr>
      </thead>
      <tbody className='bg-white dark:bg-gray-800'>
        {weapons.get().map((item, index) => (
          <tr key={item.name} className={index % 2 ? 'bg-gray-50' : ''}>
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
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default WeaponsInventory
