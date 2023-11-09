'use client'

import { useHookstate } from '@hookstate/core'
import type {ChangeEventHandler} from "react"

import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import WeaponsGrid from '@/components/EquipmentList/WeaponsGrid'
import { EquipmentState } from '@/state/EquipmentState'

export default function EquipmentTable() {
  const equipmentState = useHookstate(EquipmentState)
  const { isCostRural } = equipmentState

  const handleCostToggle:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    equipmentState.isCostRural.set(event.target.value === 'rural')
  }

  return (
    <>
      <h1 className='mb-4 inline-block text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
        Equipment
      </h1>

      <div className='my-2 flex'>
        <div className='mr-4 flex items-center'>
          <h3 className='font-semibold text-gray-900'>Cost</h3>
        </div>
        <div className='mr-4 flex items-center'>
          <input
            id='inline-radio'
            type='radio'
            value='city'
            name='inline-radio-group'
            checked={!isCostRural.get()}
            onChange={handleCostToggle}
            className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
          />
          <label
            htmlFor='inline-radio'
            className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            City
          </label>
        </div>
        <div className='mr-4 flex items-center'>
          <input
            id='inline-2-radio'
            type='radio'
            value='rural'
            name='inline-radio-group'
            className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
            checked={isCostRural.get()}
            onChange={handleCostToggle}
          />
          <label
            htmlFor='inline-2-radio'
            className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Rural
          </label>
        </div>
      </div>

      <h3 className='mb-2 text-xl font-bold text-gray-900 dark:text-white'>
        Armor
      </h3>
      <ArmorGrid />

      <h3 className='mb-2 text-xl font-bold text-gray-900 dark:text-white'>
        Weapons
      </h3>
      <WeaponsGrid />
    </>
  )
}
