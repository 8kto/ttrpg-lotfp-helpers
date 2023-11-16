import React from 'react'

import InventoryDetails from '@/components/EncumbranceFragment/InventoryDetails'
import ArmorInventory from '@/components/Inventory/ArmorInventory'
import InventoryControls from '@/components/Inventory/InventoryControls'
import MeleeWeaponsInventory from '@/components/Inventory/MeleeWeaponsInventory'
import MissileWeaponsInventory from '@/components/Inventory/MissileWeaponsInventory'
import { useInventoryState } from '@/state/InventoryState'

const Inventory = () => {
  const { state: equipmentState } = useInventoryState()
  const { armor, meleeWeapons, missileWeapons } = equipmentState

  // TODO reset for each category
  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <h1 className='mb-4 text-2xl font-extrabold tracking-tight text-red-900 sm:text-3xl'>
          Inventory
        </h1>
        <InventoryControls />
      </div>
      <InventoryDetails />

      {!!armor.get().length && (
        <>
          <h2 className='my-4 text-red-900'>Armor</h2>
          <ArmorInventory />
        </>
      )}

      {!!meleeWeapons.get().length && (
        <>
          <h2 className='my-8 mb-4 text-red-900'>Melee Weapons</h2>
          <MeleeWeaponsInventory />
        </>
      )}

      {!!missileWeapons.get().length && (
        <>
          <h2 className='my-8 mb-4 text-red-900'>Missile Weapons</h2>
          <MissileWeaponsInventory />
        </>
      )}
    </>
  )
}

export default Inventory
