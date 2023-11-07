'use client'

import React, {useEffect, useState} from 'react'
import { useHookstate } from '@hookstate/core'

import {ArmorEntry, ArmorType, EncumbrancePoint} from "@/shared/types"
import {Armor} from "@/shared/config/equipment"
import {Equipment} from "@/state/Equipment"

const ArmorTable = () => {
  const equipmentState = useHookstate(Equipment)
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
  const [filter, setFilter] = useState('')
  const [filteredArmor, setFilteredArmor] = useState(Armor)

  const handleCheckboxChange = (id: number) => {
    const item = Armor.find(i => i.id === id)
    if (item) {
      equipmentState.items[id].set(item)
    }
  }

  // Sorting function
  const onSortChange = (key: string) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  // Effect for filtering and sorting
  useEffect(() => {
    let sortedArmor = Armor
      .filter((item) => item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
      .sort((a, b) => {
        // @ts-ignore
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
        // @ts-ignore
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1

        return 0
    })
    setFilteredArmor(sortedArmor)
  }, [filter, sortConfig])

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white`
  const cellClassnames = `p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white`

  return (
    <>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter"
        className="block w-full border-0 py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <table className="min-w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th scope="col" className={headerCellClassnames}></th>
          <th scope="col" className={headerCellClassnames} onClick={() => onSortChange('name')}>Name</th>
          <th scope="col" className={headerCellClassnames} onClick={() => onSortChange('type')}>Type</th>
          <th scope="col" className={headerCellClassnames} onClick={() => onSortChange('cityCost')}>City Cost</th>
          <th scope="col" className={headerCellClassnames} onClick={() => onSortChange('ruralCost')}>Rural Cost</th>
          <th scope="col" className={headerCellClassnames} onClick={() => onSortChange('baseAC')}>AC</th>
          <th scope="col" className={headerCellClassnames} onClick={() => onSortChange('weight')}>Weight</th>
        </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
        {filteredArmor.map((armor, index) => (
          <tr key={armor.id} className={index % 2 ? 'bg-gray-50 dark:bg-gray-700': ''}>
            <td className={cellClassnames}>
              <input
                type="checkbox"
                checked={!!equipmentState.items.get()[armor.id]}
                onChange={() => handleCheckboxChange(armor.id)}
                onClick={(e) => e.stopPropagation()}
              />
            </td>
            <td className={cellClassnames} onClick={() => handleCheckboxChange(armor.id)}>{armor.name}</td>
            <td className={cellClassnames} onClick={() => handleCheckboxChange(armor.id)}>{ArmorType[armor.type]}</td>
            <td className={cellClassnames} onClick={() => handleCheckboxChange(armor.id)}>{armor.cityCost}</td>
            <td className={cellClassnames} onClick={() => handleCheckboxChange(armor.id)}>{armor.ruralCost || 'N/A'}</td>
            <td className={cellClassnames} onClick={() => handleCheckboxChange(armor.id)}>{armor.armorClass}</td>
            <td className={cellClassnames} onClick={() => handleCheckboxChange(armor.id)}>{EncumbrancePoint[armor.weight]}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}


export default function EquipmentTable() {
  return (
    <>
      <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200 mb-4">Equipment</h1>
      <ArmorTable/>
    </>
  )
}
