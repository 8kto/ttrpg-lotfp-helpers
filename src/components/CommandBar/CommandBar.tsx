import { t, Trans } from '@lingui/macro'
import React from 'react'

import Toggle from '@/components/Toggle/Toggle'
import {
  toggleCost,
  toggleFirearmsCampaign,
  useInventoryState,
} from '@/state/InventoryState'

const CommandBar = () => {
  const {
    state: { isCostRural, isFirearmsCampaign },
  } = useInventoryState()

  const handleCostToggle: React.ChangeEventHandler<HTMLInputElement> = () =>
    toggleCost()

  const radioClassnames = 'h-4 w-4 focus:ring-red-500'
  const labelClassnames = 'ml-2 text-sm text-gray-900 cursor-pointer'

  return (
    <div
      data-testid='CommandBar'
      className='my-4 flex flex-wrap justify-end gap-y-2 lg:my-2'
    >
      <div className='mr-6 flex items-center text-sm text-gray-900'>
        <Toggle
          checked={isFirearmsCampaign.get()}
          onChange={() => toggleFirearmsCampaign()}
          title={t`Optional firearms rules: firearms can be added, basic armor and shields cost 50% more.`}
        >
          <Trans>Firearms campaign</Trans>
        </Toggle>
      </div>
      <div className='mr-4 flex items-center'>
        <h3 className='font-semibold ph-color-accent'>
          <Trans>Cost</Trans>
        </h3>
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
