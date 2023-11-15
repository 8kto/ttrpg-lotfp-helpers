import React from 'react'

import InventoryDetails from '@/components/EncumbranceFragment/InventoryDetails'
import ArmorInventory from '@/components/Inventory/ArmorInventory'
import InventoryControls from '@/components/Inventory/InventoryControls'
import WeaponsInventory from '@/components/Inventory/WeaponsInventory'
import { useInventoryState } from '@/state/InventoryState'

const Inventory = () => {
  const { state: equipmentState } = useInventoryState()
  const { armor, meleeWeapons } = equipmentState

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
          <h2 className='my-8 mb-4 text-red-900'>Weapons</h2>
          <WeaponsInventory />
        </>
      )}
    </>
  )
}

export default Inventory
