import React, {useEffect, useState} from 'react'

import {Equipment} from "@/shared/config/equipment"
import DataGrid from "@/components/Grid/DataGrid"
import {useHookstate} from "@hookstate/core"
import {EquipmentState} from "@/state/EquipmentState"
import {ArmorEntry, ArmorType, EncumbrancePoint} from "@/shared/types"

const columns = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'type',
    title: 'Type',
    render: (item: ArmorEntry) => <span>{ArmorType[item.type]}</span>,
  },
  {
    key: 'cityCost',
    title: 'City Cost',
  },
  {
    key: 'ruralCost',
    title: 'Rural Cost',
  },
  {
    key: 'armorClass',
    title: 'AC',
  },
  {
    key: 'weight',
    title: 'Weight',
    render: (item: ArmorEntry) => <span>{EncumbrancePoint[item.weight]}</span>,
  },
]

const ArmorGrid = () => {
  const equipmentState = useHookstate(EquipmentState)
  const handleCheckboxChange = (id: number) => {
    const item = Equipment.Armor[id]
    if (item) {
      equipmentState.items[id].set(item)
    }
  }

  const filterName = (item: ArmorEntry, filter: string) => {
    return item.name.toLowerCase().includes(filter.toLowerCase())
  }

  const isChecked = (item: ArmorEntry) => {
    return !!equipmentState.items.get()[item.id]
  }
  
  return (
    <DataGrid
      data={Object.values(Equipment.Armor)}
      columns={columns}
      onCheckboxChange={handleCheckboxChange}
      filterFn={filterName}
      isCheckedFn={isChecked}
    />
  )
}

// TODO sort numericals (AC, cost...)
// TODO cost switcher
export default ArmorGrid

const ArmorTable = () => {
  const equipmentState = useHookstate(EquipmentState)
  const [sortConfig, setSortConfig] = useState({ key: 'type', direction: 'asc' })
  const [filter, setFilter] = useState('')
  const [filteredArmor, setFilteredArmor] = useState(Equipment.Armor)
  const [firstRender, setFirstRender] = useState(true)

  const handleCheckboxChange = (id: number) => {
    const item = Equipment.Armor[id]
    if (item) {
      equipmentState.items[id].set(item)
    }
  }

  // Sorting function
  const handleSortClick = (key: string) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  const headerCellClassnames = `p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white`
  const cellClassnames = `p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white`
  const getHeaderClassNames = (key: string) => {
    return `${headerCellClassnames} ${
      sortConfig.key === key ? 'font-bold' : ''
    } cursor-pointer`
  }

  // Effect for filtering and sorting
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
      return
    }

    let sortedArmor = Object.values(Equipment.Armor)
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
        <thead className="bg-gray-50">
        <tr>
          <th scope="col" className={headerCellClassnames}></th>
          <th scope="col" className={getHeaderClassNames('name')} onClick={() => handleSortClick('name')}>
            Name {sortIcon('name')}
          </th>
          <th scope="col" className={getHeaderClassNames('type')} onClick={() => handleSortClick('type')}>
            Type {sortIcon('type')}
          </th>
          <th scope="col" className={getHeaderClassNames('cityCost')} onClick={() => handleSortClick('cityCost')}>
            City Cost {sortIcon('cityCost')}
          </th>
          <th scope="col" className={getHeaderClassNames('ruralCost')} onClick={() => handleSortClick('ruralCost')}>
            Rural Cost {sortIcon('ruralCost')}
          </th>
          <th scope="col" className={getHeaderClassNames('armorClass')} onClick={() => handleSortClick('baseAC')}>
            AC {sortIcon('armorClass')}
          </th>
          <th scope="col" className={getHeaderClassNames('weight')} onClick={() => handleSortClick('weight')}>
            Weight {sortIcon('weight')}
          </th>
        </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
        {Object.values(filteredArmor).map((armor, index) => (
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