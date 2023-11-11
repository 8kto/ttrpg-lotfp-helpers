import React from 'react'

import InventoryDetails from '@/components/EncumbranceFragment/InventoryDetails'
import InventoryControls from '@/components/Inventory/InventoryControls'
import { EncumbrancePoint } from '@/domain/encumbrance'
import { combineEquipment } from '@/state/helpers'
import { useInventoryState } from '@/state/InventoryState'

const Inventory = () => {
  const { state: equipmentState } = useInventoryState()
  const itemsArray = combineEquipment(equipmentState)

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white`
  const cellClassnames = `p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white`

  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <h1 className='mb-4 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-3xl'>
          Inventory
        </h1>
        <InventoryControls />
      </div>
      <InventoryDetails />
      <table className='w-full table-fixed'>
        <thead className='bg-gray-50 dark:bg-gray-700'>
          <tr>
            <th
              scope='col'
              className={`${headerCellClassnames} w-1/3 truncate`}
            >
              Name
            </th>
            <th scope='col' className={`${headerCellClassnames} w-1/4`}>
              Type
            </th>
            <th scope='col' className={`${headerCellClassnames} w-1/6`}>
              Cost
            </th>
            <th scope='col' className={`${headerCellClassnames} w-1/4`}>
              Weight
            </th>
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-gray-800'>
          {itemsArray.map((item, index) => (
            <tr
              key={item.name}
              className={index % 2 ? 'bg-gray-50 dark:bg-gray-700' : ''}
            >
              <td className={`${cellClassnames} truncate`}>{item.name}</td>
              <td className={cellClassnames}>{item.type}</td>
              <td className={cellClassnames}>{item.cityCost}</td>
              <td className={cellClassnames}>
                {EncumbrancePoint[item.points]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Inventory
