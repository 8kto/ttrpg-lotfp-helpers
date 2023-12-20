import React from 'react'

import { getCoins } from '@/components/CostFragment/helpers'
import { CurrencyType } from '@/domain/currency'
import CurrencyConverter from '@/shared/services/CurrencyConverter'

const CostFragment = ({
  cost,
  onClick,
  copperPieces = false,
}: {
  cost: number
  onClick?: () => void
  copperPieces?: boolean
}) => {
  const costSilver = CurrencyConverter.convertFromTo(
    {
      value: cost,
      coin: copperPieces ? CurrencyType.Copper : CurrencyType.Silver,
    },
    CurrencyType.Silver,
  )
  const { copperPoints, silverPoints } = getCoins(costSilver.value)

  return (
    <span className='cursor-pointer text-lg' onClick={onClick}>
      <strong>{silverPoints}</strong> sp
      {Boolean(copperPoints) ? (
        <>
          , <strong>{copperPoints}</strong> cp
        </>
      ) : null}
    </span>
  )
}

export default CostFragment
