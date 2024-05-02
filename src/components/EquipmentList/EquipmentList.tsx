'use client'

import { t, Trans } from '@lingui/macro'
import React, { useContext } from 'react'

import CommandBar from '@/components/CommandBar/CommandBar'
import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import FirearmWeaponsGrid from '@/components/EquipmentList/FirearmWeaponsGrid/FirearmWeaponsGrid'
import MeleeWeaponsGrid from '@/components/EquipmentList/MeleeWeaponsGrid'
import MiscEquipmentGrid from '@/components/EquipmentList/MiscEquipmentGrid'
import MissileWeaponsGrid from '@/components/EquipmentList/MissileWeaponsGrid'
import Tabs from '@/components/Tabs'
import UiContext from '@/shared/context/uiContext'

export default function EquipmentList() {
  const {
    uiState: { activeEquipmentTabId },
    updateUiState,
  } = useContext(UiContext)

  return (
    <>
      <h1 className='mb-4 hidden text-2xl font-extrabold text-red-900 sm:text-3xl lg:inline-block'>
        <Trans>Equipment</Trans>
      </h1>
      <CommandBar />
      <p className='lg:hidden mt-4 mb-2 ph-color-muted text-sm'>
        <Trans>The Equipment tab list is scrollable.</Trans>
      </p>
      <Tabs
        activeTabId={activeEquipmentTabId}
        onTabClick={(index) => updateUiState({ activeEquipmentTabId: index })}
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
          {
            content: <FirearmWeaponsGrid />,
            key: 'firearm',
            title: t`Firearms`,
          },
        ]}
      />
    </>
  )
}
