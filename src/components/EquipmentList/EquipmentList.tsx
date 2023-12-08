'use client'

import { t, Trans } from '@lingui/macro'
import React from 'react'

import CommandBar from '@/components/CommandBar/CommandBar'
import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import MeleeWeaponsGrid from '@/components/EquipmentList/MeleeWeaponsGrid'
import MiscEquipmentGrid from '@/components/EquipmentList/MiscEquipmentGrid'
import MissileWeaponsGrid from '@/components/EquipmentList/MissileWeaponsGrid'
import Tabs from '@/components/Tabs'

export default function EquipmentList() {
  return (
    <>
      <h1 className='mb-4 hidden text-2xl font-extrabold text-red-900 sm:text-3xl lg:inline-block'>
        <Trans>Equipment</Trans>
      </h1>
      <CommandBar />
      <Tabs
        tabs={[
          { content: <ArmorGrid />, key: 'armor', title: t`Armor` },
          {
            content: <MeleeWeaponsGrid />,
            key: 'melee',
            title: t`Mêlée`,
          },
          {
            content: <MissileWeaponsGrid />,
            key: 'missile',
            title: t`Missiles`,
          },
          {
            content: <MiscEquipmentGrid />,
            key: 'miscEquipment',
            title: t`Miscellaneous`,
          },
        ]}
      />
    </>
  )
}
