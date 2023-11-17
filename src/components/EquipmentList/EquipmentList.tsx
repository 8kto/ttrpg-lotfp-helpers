'use client'

import React from 'react'

import CommandBar from '@/components/CommandBar/CommandBar'
import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import MeleeWeaponsGrid from '@/components/EquipmentList/MeleeWeaponsGrid'
import MiscEquipmentGrid from '@/components/EquipmentList/MiscEquipmentGrid'
import MissileWeaponsGrid from '@/components/EquipmentList/MissileWeaponsGrid'
import Tabs from '@/components/Tabs'
import { t } from '@/locale/helpers'

export default function EquipmentList() {
  return (
    <>
      <h1 className='mb-4 inline-block text-2xl font-extrabold text-red-900 sm:text-3xl'>
        {t('Equipment')}
      </h1>
      <p>All costs are in silver pieces</p>

      <CommandBar />

      <Tabs
        tabs={[
          { content: <ArmorGrid />, key: 'armor', title: t('Armor') },
          {
            content: <MeleeWeaponsGrid />,
            key: 'melee',
            title: t('Mêlée Weapons'),
          },
          {
            content: <MissileWeaponsGrid />,
            key: 'missile',
            title: t('Missile Weapons'),
          },
          {
            content: <MiscEquipmentGrid />,
            key: 'miscEquipment',
            title: t('Miscellaneous Equipment'),
          },
        ]}
      />
    </>
  )
}
