import React from 'react'

import { MovementRates } from '@/config/MovementRates'
import type { Encumbrance } from '@/domain/encumbrance'

const MovementFragment = ({ encumbrance }: { encumbrance: Encumbrance }) => {
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
