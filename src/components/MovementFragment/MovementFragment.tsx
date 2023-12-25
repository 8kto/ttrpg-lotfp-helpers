import { Trans } from '@lingui/macro'
import React from 'react'

import { MovementRates } from '@/config/MovementRates'
import EncumbranceService from '@/shared/services/EncumbranceService'

const MovementFragment = ({
  encumbrancePoints,
}: {
  encumbrancePoints: number
}) => {
  const encumbrance = EncumbranceService.getEncumbrance(encumbrancePoints)
  const movement = MovementRates[encumbrance]

  return (
    <>
      <h5 className='ph-font-cursive text-lg text-red-900'>
        <Trans>Dungeon</Trans>
      </h5>
      <ul className='list-disc pl-4 mb-2'>
        <li>
          <Trans>Exploration</Trans>: {movement['Exploration']}{' '}
          <Trans>ft</Trans>
        </li>
        <li>
          <Trans>Combat</Trans>: {movement['Combat']} <Trans>ft</Trans>
        </li>
        <li>
          <Trans>Running</Trans>: {movement['Running']} <Trans>ft</Trans>
        </li>
      </ul>

      <h5 className='ph-font-cursive text-lg text-red-900'>
        <Trans>Wilderness</Trans>
      </h5>
      <ul className='list-disc pl-4'>
        <li>
          <Trans>Per day</Trans>: {movement['MilesPerDay']} <Trans>miles</Trans>{' '}
          <Trans>+ CON mod on foot</Trans>
        </li>
      </ul>
    </>
  )
}

export default MovementFragment
