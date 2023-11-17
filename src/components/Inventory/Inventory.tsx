import React from 'react'

import InventoryDetails from '@/components/EncumbranceFragment/InventoryDetails'
import ArmorInventory from '@/components/Inventory/ArmorInventory'
import CategoryInventoryControls from '@/components/Inventory/CategoryInventoryControls'
import InventoryControls from '@/components/Inventory/InventoryControls'
import MeleeWeaponsInventory from '@/components/Inventory/MeleeWeaponsInventory'
import MiscEquipmentInventory from '@/components/Inventory/MiscEquipmentInventory'
import MissileWeaponsInventory from '@/components/Inventory/MissileWeaponsInventory'
import { t } from '@/locale/helpers'
import { useInventoryState } from '@/state/InventoryState'

const Inventory = () => {
  const { state: equipmentState } = useInventoryState()
  const { armor, meleeWeapons, missileWeapons, miscEquipment } = equipmentState

  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <h1 className='mb-4 text-2xl font-extrabold text-red-900 sm:text-3xl'>
          {t('Inventory')}
        </h1>
        <InventoryControls />
      </div>
      <InventoryDetails />

      {!!armor.get().length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className='my-4 text-red-900'>{t('Armor')}</h2>
            <CategoryInventoryControls category='armor' />
          </div>
          <ArmorInventory />
        </>
      )}

      {!!meleeWeapons.get().length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className='my-4 text-red-900'>{t('Mêlée Weapons')}</h2>
            <CategoryInventoryControls category='meleeWeapons' />
          </div>
          <MeleeWeaponsInventory />
        </>
      )}

      {!!missileWeapons.get().length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className='my-4 text-red-900'>{t('Missile Weapons')}</h2>
            <CategoryInventoryControls category='missileWeapons' />
          </div>
          <MissileWeaponsInventory />
        </>
      )}

      {!!miscEquipment.get().length && (
        <>
          <div className='flex w-full items-center justify-between'>
            <h2 className='my-4 text-red-900'>
              {t('Miscellaneous Equipment')}
            </h2>
            <CategoryInventoryControls category='miscEquipment' />
          </div>
          <MiscEquipmentInventory />
        </>
      )}
    </>
  )
}

export default Inventory
