import { MinusCircleIcon as MinusIcon } from '@heroicons/react/24/solid'
import React from 'react'

import type { ArmorEntry } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { useInventoryState } from '@/state/InventoryState'

const ArmorInventory = () => {
  const { state: equipmentState } = useInventoryState()
  const { armor } = equipmentState

  const onRemoveClick = (item: ArmorEntry) => {
    console.log(item.inventoryId)
    // equipmentState.set(state => {
    //
    // })
  }

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
        {armor.get().map((item, index) => (
          <tr
            key={item.name}
            className={index % 2 ? 'bg-gray-50 dark:bg-gray-700' : ''}
          >
            <td className={`${cellClassnames} truncate`}>
              <details className='ph-details-bullet'>
                <summary className='cursor-pointer list-none truncate p-4 pl-0'>
                  <div className='flex items-center'>
                    <span className='ph-custom-indicator mr-2 text-gray-400'>
                      &#9654;
                    </span>
                    {item.name} <>(AC {item.armorClass})</>
                  </div>
                </summary>
                <div className='pb-4'>
                  <>{item.details}</>
                  <ul className='ml-4 list-none pl-4'>
                    <li>AC: ({item.armorClass})</li>
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

export default ArmorInventory
