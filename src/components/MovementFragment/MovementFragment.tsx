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
      <ul className='list-disc pl-4'>
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
        <li>
          <Trans>Per day</Trans>: {movement['MilesPerDay']} <Trans>miles</Trans>
        </li>
      </ul>
    </>
  )
}

export default MovementFragment
