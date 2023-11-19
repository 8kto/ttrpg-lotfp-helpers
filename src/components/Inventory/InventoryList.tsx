import React from 'react'

import ArmorInventoryGrid from '@/components/Inventory/ArmorInventoryGrid'
import CategoryInventoryControls from '@/components/Inventory/CategoryInventoryControls'
import InventoryControls from '@/components/Inventory/InventoryControls'
import MeleeWeaponsInventoryGrid from '@/components/Inventory/MeleeWeaponsInventoryGrid'
import MiscEquipmentInventoryGrid from '@/components/Inventory/MiscEquipmentInventoryGrid'
import MissileWeaponsInventoryGrid from '@/components/Inventory/MissileWeaponsInventoryGrid'
import InventoryDetails from '@/components/InventoryDetails/InventoryDetails'
import { t } from '@/locale/helpers'
import { useInventoryState } from '@/state/InventoryState'

const InventoryList = () => {
  const { state: equipmentState } = useInventoryState()
  const { armor, meleeWeapons, missileWeapons, miscEquipment } = equipmentState

  const categoryTitleClassname = 'my-4 text-lg text-red-900'

  return (
    <>
      <div className='mb-4 flex w-full items-center justify-between'>
        <h1 className='text-2xl font-extrabold text-red-900 sm:text-3xl'>
          {t('Inventory')}
        </h1>
        <InventoryControls />
      </div>
      <InventoryDetails />

      {!!armor.get().length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className={categoryTitleClassname}>{t('Armor')}</h2>
            <CategoryInventoryControls category='armor' />
          </div>
          <ArmorInventoryGrid />
        </>
      )}

      {!!meleeWeapons.get().length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className={categoryTitleClassname}>{t('Mêlée Weapons')}</h2>
            <CategoryInventoryControls category='meleeWeapons' />
          </div>
          <MeleeWeaponsInventoryGrid />
        </>
      )}

      {!!missileWeapons.get().length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className={categoryTitleClassname}>{t('Missile Weapons')}</h2>
            <CategoryInventoryControls category='missileWeapons' />
          </div>
          <MissileWeaponsInventoryGrid />
        </>
      )}

      {!!miscEquipment.get().length && (
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
