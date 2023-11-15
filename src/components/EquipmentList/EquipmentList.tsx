'use client'

import CommandBar from '@/components/CommandBar/CommandBar'
import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import MeleeWeaponsGrid from '@/components/EquipmentList/MeleeWeaponsGrid'

export default function EquipmentList() {
  return (
    <>
      <h1 className='mb-4 inline-block text-2xl font-extrabold tracking-tight text-red-900 sm:text-3xl'>
        Equipment
      </h1>
      <CommandBar />

      <h3 className='mb-4 mt-8 text-xl font-bold text-red-900'>Armor</h3>
      <ArmorGrid />

      <h3 className='mb-4 mt-8 text-xl font-bold text-red-900'>
        Melee Weapons
      </h3>
      <MeleeWeaponsGrid />
    </>
  )
}
