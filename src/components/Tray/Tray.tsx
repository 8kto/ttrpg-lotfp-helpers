import React from 'react'
import { useHookstate } from '@hookstate/core'

import { EquipmentState } from '@/state/EquipmentState'
import EncumbranceBadge from '@/components/EncumbranceBadge/EncumbranceBadge'
import type { ArmorEntry } from '@/shared/types/armor'
import { ArmorType } from '@/shared/types/armor'
import { EncumbrancePoint } from '@/shared/types/encumbrance'
import { combineEquipment } from '@/state/helpers'

const Tray = () => {
  const equipmentState = useHookstate(EquipmentState)
  const itemsArray = combineEquipment(equipmentState)

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white`
  const cellClassnames = `p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white`

  const handleReset = () => {
    equipmentState.armor.set({})
    equipmentState.weapons.set({})
    // equipmentState.reset() TODO ?
  }

  return (
    <>
      <h1 className='mb-4 inline-block text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-3xl'>
        Tray
      </h1>
      <button
        className='float-right my-2 bg-gray-500 px-3 py-1 text-base text-white hover:bg-gray-400'
        onClick={handleReset}
      >
        Reset
      </button>

      <EncumbranceBadge />

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
              key={armor.id}
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

export default Tray
