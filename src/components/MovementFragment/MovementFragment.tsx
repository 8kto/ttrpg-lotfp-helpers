import { Trans } from '@lingui/macro'
import React from 'react'

import { getMovementAdjustments } from '@/components/MovementFragment/helpers'
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
      <ul className='mb-5 list-disc pl-4'>
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
      <p className='mb-2'>
        <Trans>Per day</Trans>: {movement['MilesPerDay']} <Trans>miles</Trans>{' '}
        <Trans>(on foot: + CON mod)</Trans>
      </p>
      <select
        name='terrain-adjustments'
        id='terrain-adjustments'
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-primary-500 focus:ring-primary-500 mb-1'
      >
        {getMovementAdjustments('terrain').map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
      <select
        name='terrain-adjustments'
        id='terrain-adjustments'
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-primary-500 focus:ring-primary-500'
      >
        {getMovementAdjustments('weather').map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>
    </>
  )
}

export default MovementFragment
