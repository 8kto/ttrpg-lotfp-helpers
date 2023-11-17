'use client'

import CommandBar from '@/components/CommandBar/CommandBar'
import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import MeleeWeaponsGrid from '@/components/EquipmentList/MeleeWeaponsGrid'
import MissileWeaponsGrid from '@/components/EquipmentList/MissileWeaponsGrid'
import Tabs from '@/components/Tabs'
import { t } from '@/locale/helpers'

export default function EquipmentList() {
  return (
    <>
      <h1 className='mb-4 inline-block text-2xl font-extrabold text-red-900 sm:text-3xl'>
        {t('Equipment')}
      </h1>
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
        ]}
      />
    </>
  )
}
