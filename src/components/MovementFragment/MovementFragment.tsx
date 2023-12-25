import { Trans } from '@lingui/macro'
import React, { useContext, useMemo } from 'react'

import {
  getMovementAdjustments,
  modifyMovement,
} from '@/components/MovementFragment/helpers'
import { MovementRates } from '@/config/MovementRates'
import type { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'
import UiContext from '@/shared/context/uiContext'
import EncumbranceService from '@/shared/services/EncumbranceService'

const MovementFragment = ({
  encumbrancePoints,
}: {
  encumbrancePoints: number
}) => {
  const encumbrance = EncumbranceService.getEncumbrance(encumbrancePoints)
  const movementDict = MovementRates[encumbrance]
  const {
    uiState,
    uiState: { weather, terrain },
    updateUiState,
  } = useContext(UiContext)

  const handleWeatherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUiState({
      // TODO find out whether it can be omit
      ...uiState,
      weather: event.target.value as WeatherAdjustment,
    })
  }
  const handleTerrainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUiState({
      ...uiState,
      terrain: event.target.value as TerrainAdjustment,
    })
  }

  const movement = useMemo(() => {
    return modifyMovement({
      movement: movementDict['MilesPerDay'],
      terrain,
      weather,
    })
  }, [movementDict, terrain, weather])

  return (
    <>
      <h5 className='ph-font-cursive text-lg text-red-900'>
        <Trans>Dungeon</Trans>
      </h5>
      <ul className='mb-5 list-disc pl-4'>
        <li>
          <Trans>Exploration</Trans>: {movementDict['Exploration']}{' '}
          <Trans>ft</Trans>
        </li>
        <li>
          <Trans>Combat</Trans>: {movementDict['Combat']} <Trans>ft</Trans>
        </li>
        <li>
          <Trans>Running</Trans>: {movementDict['Running']} <Trans>ft</Trans>
        </li>
      </ul>

      <h5 className='ph-font-cursive text-lg text-red-900'>
        <Trans>Wilderness</Trans>
      </h5>
      <p className='mb-2'>
        <Trans>Per day</Trans>: {movement} <Trans>miles</Trans>{' '}
        <Trans>(on foot: + CON mod)</Trans>
      </p>
      <select
        name='terrain-adjustments'
        id='terrain-adjustments'
        onChange={handleTerrainChange}
        value={terrain}
        className='mb-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-primary-500 focus:ring-primary-500'
      >
        {getMovementAdjustments('terrain').map(([key, title]) => {
          return (
            <option key={key} value={key} defaultChecked={key === terrain}>
              {title}
            </option>
          )
        })}
      </select>
      <select
        name='weather-adjustments'
        id='weather-adjustments'
        onChange={handleWeatherChange}
        value={weather}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-primary-500 focus:ring-primary-500'
      >
        {getMovementAdjustments('weather').map(([key, title]) => (
          <option key={key} value={key} defaultChecked={key === weather}>
            {title}
          </option>
        ))}
      </select>
    </>
  )
}

export default MovementFragment
