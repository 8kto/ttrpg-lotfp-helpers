import React, { useEffect, useState } from 'react'

import ArmorInventoryGrid from '@/components/Inventory/ArmorInventoryGrid'
import CategoryInventoryControls from '@/components/Inventory/CategoryInventoryControls'
import InventoryControls from '@/components/Inventory/InventoryControls'
import MeleeWeaponsInventoryGrid from '@/components/Inventory/MeleeWeaponsInventoryGrid'
import MiscEquipmentInventoryGrid from '@/components/Inventory/MiscEquipmentInventoryGrid'
import MissileWeaponsInventoryGrid from '@/components/Inventory/MissileWeaponsInventoryGrid'
import InventoryDetails from '@/components/InventoryDetails/InventoryDetails'
import Spinner from '@/components/Spinner'
import { t } from '@/locale/helpers'
import { useInventoryState } from '@/state/InventoryState'

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='mb-4 flex w-full items-center justify-between'>
      <h1 className='text-2xl font-extrabold text-red-900 sm:text-3xl'>
        {t('Inventory')}
      </h1>
      {children}
    </div>
  )
}

const InventoryList = () => {
  const { state: equipmentState } = useInventoryState()
  const { armor, meleeWeapons, missileWeapons, miscEquipment } = equipmentState

  // Fix the hydration errors when the data restored from the local storage
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <>
        <Header />
        <Spinner />
      </>
    )
  }

  const categoryTitleClassname = 'my-4 text-lg text-red-900'

  return (
    <>
      <Header>
        <InventoryControls />
      </Header>
      <InventoryDetails />

      {!!armor.length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className={categoryTitleClassname}>{t('Armor')}</h2>
            <CategoryInventoryControls category='armor' />
          </div>
          <ArmorInventoryGrid />
        </>
      )}

      {!!meleeWeapons.length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className={categoryTitleClassname}>{t('Mêlée Weapons')}</h2>
            <CategoryInventoryControls category='meleeWeapons' />
          </div>
          <MeleeWeaponsInventoryGrid />
        </>
      )}

      {!!missileWeapons.length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className={categoryTitleClassname}>{t('Missile Weapons')}</h2>
            <CategoryInventoryControls category='missileWeapons' />
          </div>
          <MissileWeaponsInventoryGrid />
        </>
      )}

      {!!miscEquipment.length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className={categoryTitleClassname}>
              {t('Miscellaneous Equipment')}
            </h2>
            <CategoryInventoryControls category='miscEquipment' />
          </div>
          <MiscEquipmentInventoryGrid />
        </>
      )}
    </>
  )
}

export default InventoryList
