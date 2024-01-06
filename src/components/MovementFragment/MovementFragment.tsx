import { Plural, Trans } from '@lingui/macro'
import React, { useContext, useMemo } from 'react'

import { getMovementAdjustments } from '@/components/MovementFragment/helpers'
import { MovementRates } from '@/config/MovementRates'
import { TerrainAdjustment, WeatherAdjustment } from '@/domain/movement'
import UiContext from '@/shared/context/uiContext'
import { modifyMovement } from '@/shared/helpers/movement'
import { roundTo } from '@/shared/helpers/roundTo'
import EncumbranceService from '@/shared/services/EncumbranceService'

const MovementFragment = ({
  encumbrancePoints,
}: {
  encumbrancePoints: number
}) => {
  const encumbrance = EncumbranceService.getEncumbrance(encumbrancePoints)
  const movementDict = MovementRates[encumbrance]
  const {
    uiState: { weather, terrain },
    updateUiState,
  } = useContext(UiContext)

  const handleWeatherChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUiState({
      weather: event.target.value as WeatherAdjustment,
    })
  }
  const handleTerrainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUiState({
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

  const titleClassname = 'ph-font-cursive text-lg font-semibold text-gray-600'
  const miPerDay = roundTo(movement, 1)

  return (
    <>
      <h5 className={titleClassname}>
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

      <h5 className={titleClassname}>
        <Trans>Wilderness</Trans>
      </h5>
      <p className='mb-2'>
        <Trans>Per day</Trans>: {miPerDay}{' '}
        <Trans>
          <Plural
            value={miPerDay}
            _0='miles'
            one='mile'
            two='miles'
            few='miles'
            many='miles'
            other='miles'
          />
        </Trans>
        <br />
        <Trans>on foot: + CON mod</Trans>
      </p>
      <select
        name='terrain-adjustments'
        id='terrain-adjustments'
        onChange={handleTerrainChange}
        value={terrain}
        className='mb-1 block w-full rounded border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-primary-500 focus:ring-primary-500'
      >
        {getMovementAdjustments(TerrainAdjustment).map(([key, title]) => {
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
        className='block w-full rounded border border-gray-300 bg-gray-50 p-1 text-gray-900 focus:border-primary-500 focus:ring-primary-500'
      >
        {getMovementAdjustments(WeatherAdjustment).map(([key, title]) => (
          <option key={key} value={key} defaultChecked={key === weather}>
            {title}
          </option>
        ))}
      </select>
    </>
  )
}

export default MovementFragment
