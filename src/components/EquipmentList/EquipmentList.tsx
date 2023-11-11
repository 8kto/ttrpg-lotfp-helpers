'use client'

import CommandBar from '@/components/CommandBar/CommandBar'
import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import WeaponsGrid from '@/components/EquipmentList/WeaponsGrid'

export default function EquipmentList() {
  return (
    <>
      <h1 className='mb-4 inline-block text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
        Equipment
      </h1>
      <CommandBar />

      <h3 className='mb-2 text-xl font-bold text-gray-900'>Armor</h3>
      <ArmorGrid />

      <h3 className='mb-2 text-xl font-bold text-gray-900'>Weapons</h3>
      <WeaponsGrid />
    </>
  )
}
