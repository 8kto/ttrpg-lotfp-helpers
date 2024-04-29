import { Trans } from '@lingui/macro'
import React from 'react'

const FirearmsFilterPanel = () => {
  const radioClassnames = 'h-4 w-4 focus:ring-red-500'
  const labelClassnames = 'ml-2 text-sm text-gray-900 cursor-pointer'

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
        <div className='mr-4 flex items-center'>
          <input
            id='matchlock-radio'
            type='radio'
            value='matchlock'
            name='inline-radio-group'
            checked={true}
            className={radioClassnames}
          />
          <label htmlFor='matchlock-radio' className={labelClassnames}>
            <Trans>Matchlock</Trans>
          </label>
        </div>
        <div className='mr-4 flex items-center'>
          <input
            id='wheellock-radio'
            type='radio'
            value='wheellock'
            name='inline-radio-group'
            className={radioClassnames}
            checked={false}
          />
          <label htmlFor='wheellock-radio' className={labelClassnames}>
            <Trans>Wheellock</Trans>
          </label>
        </div>
        <div className='mr-4 flex items-center'>
          <input
            id='flintlock-radio'
            type='radio'
            value='flintlock'
            name='inline-radio-group'
            className={radioClassnames}
            checked={false}
          />
          <label htmlFor='flintlock-radio' className={labelClassnames}>
            <Trans>Flintlock</Trans>
          </label>
        </div>
      </div>
      <div
        data-testid='FirearmsFilterPanel__secondLine'
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
            value='riffled'
            name='inline-radio-group'
            checked={true}
            className={radioClassnames}
          />
        </div>
      </div>
    </div>
  )
}

export default FirearmsFilterPanel
