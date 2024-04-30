import { Trans } from '@lingui/macro'
import React, { useEffect, useState } from 'react'

import { FiringMechanism,YearPeriod  } from '@/domain/firearms'

export type FilterValues = {
  firingMechanism: FiringMechanism
  riffled: boolean
  year: YearPeriod
}

type FirearmsFilterPanelProps = {
  onChange: (v: FilterValues) => void
}

const FirearmsFilterPanel = ({ onChange }: FirearmsFilterPanelProps) => {
  const [formValues, setFormValues] = useState<FilterValues>({
    firingMechanism: FiringMechanism.Matchlock,
    riffled: false,
    year: YearPeriod['> 1661'],
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target

    setFormValues((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  useEffect(() => {
    onChange(formValues)
  }, [formValues, onChange])

  return (
    <div data-testid='FirearmsFilterPanel'>
      <div
        data-testid='FirearmsFilterPanel__firstLine'
        className='my-4 flex justify-start lg:my-2'
      >
        <div className='mr-4 flex items-center'>
          <h3 className='ph-color-accent font-semibold'>
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
              checked={formValues.firingMechanism === mechanism}
              onChange={handleChange}
              name='firingMechanism'
              className='h-4 w-4 focus:ring-red-500'
            />
            <label
              htmlFor={`${mechanism}-radio`}
              className='ml-2 cursor-pointer text-sm text-gray-900'
            >
              {mechanism}
            </label>
          </div>
        ))}
      </div>
      <div
        data-testid='FirearmsFilterPanel__secondLine'
        className='my-4 flex justify-start lg:my-2'
      >
        <div className='mr-4 flex items-center'>
          <h3 className='ph-color-accent font-semibold'>
            <label htmlFor='year-checkbox'>
              <Trans>Year</Trans>
            </label>
          </h3>
        </div>
        {[YearPeriod['1610-1630'], YearPeriod['1631-1660'], YearPeriod['> 1661']].map((year) => (
          <div key={year} className='mr-4 flex items-center'>
            <input
              id={`${year}-radio`}
              type='radio'
              value={year}
              checked={formValues.year === year}
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
      <div
        data-testid='FirearmsFilterPanel__thirdLine'
        className='my-4 flex justify-start lg:my-2'
      >
        <div className='mr-4 flex items-center'>
          <h3 className='ph-color-accent font-semibold'>
            <label htmlFor='riffled-checkbox'>
              <Trans>Riffled</Trans>
            </label>
          </h3>
        </div>
        <div className='mr-4 flex items-center'>
          <input
            id='riffled-checkbox'
            type='checkbox'
            checked={formValues.riffled}
            onChange={handleChange}
            name='riffled'
            className='h-4 w-4 focus:ring-red-500'
          />
        </div>
      </div>
    </div>
  )
}

export default FirearmsFilterPanel
