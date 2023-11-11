import React from 'react'

import InventoryDetails from '@/components/EncumbranceFragment/InventoryDetails'
import type { ArmorEntry } from '@/domain/armor'
import { ArmorType } from '@/domain/armor'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { combineEquipment } from '@/state/helpers'
import { useInventoryState } from '@/state/InventoryState'

const Inventory = () => {
  const { state: equipmentState, resetEquipment } = useInventoryState()
  const itemsArray = combineEquipment(equipmentState)

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white`
  const cellClassnames = `p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white`

  const handleReset = () => resetEquipment()

  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <h1 className='mb-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-3xl'>
          Inventory
        </h1>

        <div className='flex items-center sm:justify-end'>
          <div className='flex space-x-1 pl-2'>
            <a
              href='#'
              onClick={handleReset}
              title={'Reset'}
              className='inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
            >
              <svg
                className='h-6 w-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <InventoryDetails />

      <table className='min-w-full'>
        <thead className='bg-gray-50 dark:bg-gray-700'>
          <tr>
            <th scope='col' className={headerCellClassnames}>
              Name
            </th>
            <th scope='col' className={headerCellClassnames}>
              Type
            </th>
            <th scope='col' className={headerCellClassnames}>
              Cost
            </th>
            <th scope='col' className={headerCellClassnames}>
              Weight
            </th>
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-gray-800'>
          {itemsArray.map((armor, index) => (
            <tr
              key={armor.name}
              className={index % 2 ? 'bg-gray-50 dark:bg-gray-700' : ''}
            >
              <td className={cellClassnames}>{armor.name}</td>
              <td className={cellClassnames}>
                {ArmorType[(armor as ArmorEntry).type]}
              </td>
              <td className={cellClassnames}>{armor.cityCost}</td>
              <td className={cellClassnames}>
                {EncumbrancePoint[armor.points]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Inventory
