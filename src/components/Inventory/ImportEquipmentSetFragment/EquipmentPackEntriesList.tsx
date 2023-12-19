import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import type { EquipmentPack } from '@/domain/equipment'
import { getEquipmentPackCost } from '@/shared/helpers/equipmentPack'

export const EquipmentPackEntriesList = ({ pack }: { pack: EquipmentPack }) => {
  const { _: trans } = useLingui()
  const cost = getEquipmentPackCost(pack)

  return (
    <>
      <div className='mb-4'>
        <p className={'mb-2 text-red-900'}>
          <Trans>Cost</Trans>: <CostFragment cost={cost} />
        </p>
      </div>
      <dl className='divide-y divide-gray-100'>
        {pack.items.map(([name, qty]) => {
          return (
            <div
              key={name}
              className={'grid grid-cols-3 px-0 py-1 align-baseline sm:gap-2'}
            >
              <dt className={`ph-font-cursive col-span-2 text-lg`}>
                {trans(name)}
              </dt>
              <dd className='col-span-1 mt-1 flex items-center leading-6 text-gray-700 sm:mt-0'>
                {qty}
              </dd>
            </div>
          )
        })}
      </dl>
    </>
  )
}
