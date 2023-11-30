import { Trans } from '@lingui/macro'
import React from 'react'

import { toggleCost, useInventoryState } from '@/state/InventoryState'

const CommandBar = () => {
  const {
    state: { isCostRural },
  } = useInventoryState()

  const handleCostToggle: React.ChangeEventHandler<HTMLInputElement> = () =>
    toggleCost()

  const radioClassnames = 'h-4 w-4 focus:ring-red-500'
  const labelClassnames = 'ml-2 text-sm text-gray-900 cursor-pointer'

  return (
    <div className='my-2 flex justify-end'>
      <div className='mr-4 flex items-center'>
        <h3 className='font-semibold text-red-900'>Cost</h3>
      </div>
      <div className='mr-4 flex items-center'>
        <input
          id='city-radio'
          type='radio'
          value='city'
          name='inline-radio-group'
          checked={!isCostRural.get()}
          onChange={handleCostToggle}
          className={radioClassnames}
        />
        <label htmlFor='city-radio' className={labelClassnames}>
          <Trans>City</Trans>
        </label>
      </div>
      <div className='mr-4 flex items-center'>
        <input
          id='rural-radio'
          type='radio'
          value='rural'
          name='inline-radio-group'
          className={radioClassnames}
          checked={isCostRural.get()}
          onChange={handleCostToggle}
        />
        <label htmlFor='rural-radio' className={labelClassnames}>
          <Trans>Rural</Trans>
        </label>
      </div>
    </div>
  )
}

export default CommandBar
