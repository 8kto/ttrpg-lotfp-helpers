import {
  PlusCircleIcon as PlusIcon} from '@heroicons/react/24/solid'
import { t, Trans } from '@lingui/macro'
import React from 'react'

import ArmorInventoryGrid from '@/components/Inventory/ArmorInventoryGrid'
import CategoryInventoryControls from '@/components/Inventory/CategoryInventoryControls'
import InventoryControls from '@/components/Inventory/InventoryControls'
import MeleeWeaponsInventoryGrid from '@/components/Inventory/MeleeWeaponsInventoryGrid'
import MiscEquipmentInventoryGrid from '@/components/Inventory/MiscEquipmentInventoryGrid'
import MissileWeaponsInventoryGrid from '@/components/Inventory/MissileWeaponsInventoryGrid'
import InventoryDetails from '@/components/InventoryDetails/InventoryDetails'
import { useInventoryState } from '@/state/InventoryState'

const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='mb-4 flex w-full items-center justify-between'>
      <h1 className='hidden text-2xl font-extrabold text-red-900 sm:text-3xl lg:inline-block'>
        <Trans>Inventory</Trans>
      </h1>
      {children}
    </div>
  )
}

const InventoryList = () => {
  const { state: equipmentState } = useInventoryState()
  const { armor, meleeWeapons, missileWeapons, miscEquipment } = equipmentState

  const categoryTitleClassname = 'my-4 text-xl ph-color-accent mr-1'

  const hasArmor = !!armor.length
  const hasMeleeWeapons = !!meleeWeapons.length
  const hasMissileWeapons = !!missileWeapons.length
  const hasMiscEquipment = !!miscEquipment.length
  const hasAny = hasArmor || hasMeleeWeapons || hasArmor || hasMiscEquipment

  return (
    <>
      <Header>
        <InventoryControls />
      </Header>
      <InventoryDetails />

      {hasAny && <hr className='my-2 border-t border-gray-100' />}

      {hasArmor && (
        <div className='mb-6'>
          <div className='flex w-full items-center'>
            <h2 className={categoryTitleClassname}>
              <Trans>Armor</Trans>
            </h2>
            <CategoryInventoryControls category='armor' />
          </div>
          <ArmorInventoryGrid />
        </div>
      )}

      {hasMeleeWeapons && (
        <div className='mb-6'>
          <div className='flex w-full items-center'>
            <h2 className={categoryTitleClassname}>
              <Trans>Mêlée Weapons</Trans>
            </h2>
            <CategoryInventoryControls category='meleeWeapons' />
          </div>
          <MeleeWeaponsInventoryGrid />
        </div>
      )}

      {hasMissileWeapons && (
        <div className='mb-6'>
          <div className='flex w-full items-center'>
            <h2 className={categoryTitleClassname}>
              <Trans>Missile Weapons</Trans>
            </h2>
            <CategoryInventoryControls category='missileWeapons' />
          </div>
          <MissileWeaponsInventoryGrid />
        </div>
      )}

      {hasMiscEquipment && (
        <div className='mb-6'>
          <div className='flex w-full items-center'>
            <h2 className={categoryTitleClassname}>
              <Trans>Miscellaneous Equipment</Trans>
            </h2>
            <CategoryInventoryControls category='miscEquipment'>
              <button
                type='button'
                onClick={() => {
                  // TODO
                  // setEquipmentDrawerOpen(true)
                }}
                title={t`Add item`}
                className='cursor-pointer flex-col items-center justify-center rounded p-1 text-xs ph-color-accent hover:text-red-800 hover:bg-gray-100 lg:p-1'
              >
                <PlusIcon className='h-5 w-5' />
              </button>
            </CategoryInventoryControls>
          </div>
          <MiscEquipmentInventoryGrid />
        </div>
      )}
    </>
  )
}

export default InventoryList
