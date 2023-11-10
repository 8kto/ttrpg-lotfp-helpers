import React from 'react'

import { MovementRates } from '@/config/MovementRates'
import type { Encumbrance } from '@/domain/encumbrance'

const MovementBadge = ({ encumbrance }: { encumbrance: Encumbrance }) => {
  const movement = MovementRates[encumbrance]

  return (
    <>
      Movement
      <ul className='mb-4 ml-4 list-disc space-y-3 pl-4 text-gray-500'>
        <li>Exploration: {movement['Exploration']}</li>
        <li>Combat: {movement['Combat']}</li>
        <li>Running: {movement['Running']}</li>
        <li>Miles per day: {movement['MilesPerDay']}</li>
      </ul>
    </>
  )
}

export default MovementBadge
