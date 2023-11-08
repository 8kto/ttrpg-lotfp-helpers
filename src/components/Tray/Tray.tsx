import React, {useEffect, useState} from 'react'
import {useHookstate} from "@hookstate/core"

import {EquipmentState} from "@/state/EquipmentState"
import EncumbranceBadge from "@/components/EncumbranceBadge/EncumbranceBadge"
import {ArmorEntry, ArmorType} from "@/shared/types/armor"
import {EncumbrancePoint} from "@/shared/types/encumbrance"

const Tray = () => {
  const equipmentState = useHookstate(EquipmentState)
  const itemsArray = Object
    .entries(equipmentState.items.get())
    .map(([, item]) => item)

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white`
  const cellClassnames = `p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white`

  const handleReset = () => {
    equipmentState.items.set({})
  }

  return (
    <>
      <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 mb-4">Tray</h1>
      <button
        className="px-3 py-1 text-base bg-gray-500 hover:bg-gray-400 text-white my-2 float-right"
        onClick={handleReset}
      >
        Reset
      </button>

      <EncumbranceBadge />

      <table className="min-w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th scope="col" className={headerCellClassnames}>Name</th>
          <th scope="col" className={headerCellClassnames}>Type</th>
          <th scope="col" className={headerCellClassnames}>Cost</th>
          <th scope="col" className={headerCellClassnames}>AC</th>
          <th scope="col" className={headerCellClassnames}>Weight</th>
        </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
        {itemsArray.map((armor, index) => (
          <tr key={armor.id} className={index % 2 ? 'bg-gray-50 dark:bg-gray-700': ''}>
            <td className={cellClassnames}>{armor.name}</td>
            <td className={cellClassnames}>{ArmorType[(armor as ArmorEntry).type]}</td>
            <td className={cellClassnames}>{armor.cityCost}</td>
            <td className={cellClassnames}>{(armor as ArmorEntry).armorClass}</td>
            <td className={cellClassnames}>{EncumbrancePoint[armor.points]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default Tray