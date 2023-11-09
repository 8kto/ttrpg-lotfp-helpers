import React from 'react'

import type { Encumbrance } from '@/shared/types/encumbrance'
import { MovementMap } from '@/shared/types/encumbrance'

const MovementBadge = ({ encumbrance }: { encumbrance: Encumbrance }) => {
  const movement = MovementMap[encumbrance]

  return (
    <>Movement
      <ul className='ml-4 mb-4 list-disc space-y-3 pl-4 text-gray-500'>
        <li>Exploration: {movement["Exploration"]}</li>
        <li>Combat: {movement["Combat"]}</li>
        <li>Running: {movement["Running"]}</li>
        <li>Miles per day: {movement["MilesPerDay"]}</li>
      </ul></>
  )
}

export default MovementBadge
