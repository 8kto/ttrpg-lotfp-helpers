import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'

import type { FilterValues } from '@/components/EquipmentList/FirearmWeaponsGrid/types'
import { FiringMechanismLabels } from '@/config/Firearms'
import { FiringMechanism, YearPeriod } from '@/domain/firearms'

type FirearmsFilterPanelProps = {
  values: FilterValues
  onChange: (v: FilterValues) => void
}

const FirearmsFilterPanel = ({
  values,
  onChange,
}: FirearmsFilterPanelProps) => {
  const { _: trans } = useLingui()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    onChange({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  // Only flintlock cost depends on the year
  const isYearRelevant = values.firingMechanism === FiringMechanism.Flintlock

  return (
    <div data-testid='FirearmsFilterPanel'>
      <div
        data-testid='FirearmsFilterPanel__firstLine'
        className='my-4 flex flex-wrap justify-start lg:my-2'
      >
        <div className='w-full md:w-auto'>
          <h3 className='ph-color-accent mr-4 font-semibold'>
            <Trans>Firearm mechanism</Trans>
          </h3>
        </div>
        {[
          FiringMechanism.Matchlock,
          FiringMechanism.Wheellock,
          FiringMechanism.Flintlock,
        ].map((mechanism) => (
          <div key={mechanism} className='mr-4 flex items-center'>
            <input
              id={`${mechanism}-radio`}
              type='radio'
              value={mechanism}
              checked={values.firingMechanism === mechanism}
              onChange={handleChange}
              name='firingMechanism'
              className='h-4 w-4 focus:ring-red-500'
            />
            <label
              htmlFor={`${mechanism}-radio`}
              className='ml-2 cursor-pointer text-sm text-gray-900'
            >
              {/* TODO add short tooltips */}
              {trans(FiringMechanismLabels[mechanism])}
            </label>
          </div>
        ))}
      </div>

      {isYearRelevant && (
        <div
          data-testid='FirearmsFilterPanel__secondLine'
          className='my-4 flex flex-wrap justify-start lg:my-2'
        >
          <div className='w-full md:w-auto'>
            <h3 className='ph-color-accent mr-4 font-semibold'>
              <Trans>Year</Trans>
            </h3>
          </div>
          {[
            YearPeriod['1610-1630'],
            YearPeriod['1631-1660'],
            YearPeriod['> 1661'],
          ].map((year) => (
            <div key={year} className='mr-4 flex items-center'>
              <input
                id={`${year}-radio`}
                type='radio'
                value={year}
                checked={values.year === year}
                onChange={handleChange}
                name='year'
                className='h-4 w-4 focus:ring-red-500'
              />
              <label
                htmlFor={`${year}-radio`}
                className='ml-2 cursor-pointer text-sm text-gray-900'
              >
                {year}
              </label>
            </div>
          ))}
        </div>
      )}

      <div
        data-testid='FirearmsFilterPanel__thirdLine'
        className='my-4 flex flex-wrap justify-start lg:my-2'
      >
        <div className='mr-4 flex items-center'>
          <h3 className='ph-color-accent font-semibold'>
            <label htmlFor='rifled-checkbox'>
              <Trans>Rifled</Trans>
            </label>
          </h3>
        </div>
        <div className='mr-4 flex items-center'>
          <input
            id='rifled-checkbox'
            type='checkbox'
            checked={values.rifled}
            onChange={handleChange}
            name='rifled'
            className='h-4 w-4 focus:ring-red-500'
          />
        </div>
      </div>
    </div>
  )
}

export default FirearmsFilterPanel
