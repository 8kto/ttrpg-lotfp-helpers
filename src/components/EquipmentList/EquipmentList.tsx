'use client'

import CommandBar from '@/components/CommandBar/CommandBar'
import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import MeleeWeaponsGrid from '@/components/EquipmentList/MeleeWeaponsGrid'
import MissileWeaponsGrid from '@/components/EquipmentList/MissileWeaponsGrid'
import { t } from '@/locale/helpers'

export default function EquipmentList() {
  return (
    <>
      <h1 className='mb-4 inline-block text-2xl font-extrabold tracking-tight text-red-900 sm:text-3xl'>
        {t('Equipment')}
      </h1>
      <CommandBar />

      <h3 className='mb-4 mt-8 text-xl font-bold text-red-900'>{t('Armor')}</h3>
      <ArmorGrid />

      <h3 className='mb-4 mt-8 text-xl font-bold text-red-900'>
        {t('Melee Weapons')}
      </h3>
      <MeleeWeaponsGrid />

      <h3 className='mb-4 mt-8 text-xl font-bold text-red-900'>
        {t('Missile Weapons')}
      </h3>
      <MissileWeaponsGrid />
    </>
  )
}
