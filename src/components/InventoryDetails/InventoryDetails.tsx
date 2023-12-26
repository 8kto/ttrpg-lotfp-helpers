import { Trans } from '@lingui/macro'
import React, { useMemo } from 'react'

import CostFragment from '@/components/CostFragment/CostFragment'
import EncumbranceFragment from '@/components/EncumbranceFragment/EncumbranceFragment'
import MovementFragment from '@/components/MovementFragment/MovementFragment'
import Wallet from '@/components/Wallet/Wallet'
import EncumbranceService from '@/shared/services/EncumbranceService'
import { combineEquipment } from '@/state/helpers'
import { useInventoryState } from '@/state/InventoryState'

const InventoryDetails = () => {
  const { state: equipmentState } = useInventoryState()

  const { totalEncumbrancePoints, totalCosts } = useMemo(() => {
    const { isCoinWeightActive, wallet, encumbranceThreshold } = equipmentState

    const encumbranceService = new EncumbranceService({
      threshold: encumbranceThreshold.get(),
    })

    return encumbranceService.getTotal(
      combineEquipment(equipmentState),
      isCoinWeightActive.get() ? wallet.get() : null,
    )
  }, [equipmentState])

  const titleClassname = 'ph-font-cursive text-red-900 text-lg'
  const detailsRowClassname =
    'px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0  align-baseline'

  return (
    <div className='mt-4 border-t border-gray-100 text-base'>
      <dl className='divide-y divide-gray-100'>
        <div className={detailsRowClassname}>
          <dt className={titleClassname}>
            <Trans>Wallet</Trans>
          </dt>
          <dd className='mt-1 flex items-center leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <Wallet />
          </dd>
        </div>
        <div className={detailsRowClassname}>
          <dt className={titleClassname}>
            <Trans>Inventory cost</Trans>
          </dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <CostFragment wallet={totalCosts} optimize />
          </dd>
        </div>
        <div className={detailsRowClassname}>
          <dt className={titleClassname}>
            <Trans>Encumbrance</Trans>
          </dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <EncumbranceFragment encumbrancePoints={totalEncumbrancePoints} />
          </dd>
        </div>
        <div className={detailsRowClassname}>
          <dt className={titleClassname}>
            <Trans>Movement</Trans>
          </dt>
          <dd className='mt-1 leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
            <MovementFragment encumbrancePoints={totalEncumbrancePoints} />
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default InventoryDetails
