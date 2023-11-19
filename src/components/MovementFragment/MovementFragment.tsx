import React from 'react'

import { getEncumbrance } from '@/components/InventoryDetails/helpers'
import { MovementRates } from '@/config/MovementRates'

const MovementFragment = ({
  encumbrancePoints,
}: {
  encumbrancePoints: number
}) => {
  const encumbrance = getEncumbrance(encumbrancePoints)
  const movement = MovementRates[encumbrance]

  return (
    <>
      <ul className='list-disc pl-4'>
        <li>Exploration: {movement['Exploration']} feet</li>
        <li>Combat: {movement['Combat']} feet</li>
        <li>Running: {movement['Running']} feet</li>
        <li>Per day: {movement['MilesPerDay']} miles</li>
      </ul>
    </>
  )
}

export default MovementFragment
