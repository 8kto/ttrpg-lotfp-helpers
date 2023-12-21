import React from 'react'

import type { CurrencyWallet } from '@/domain/currency'
import CurrencyConverter from '@/shared/services/CurrencyConverter'

const CostFragment = ({
  wallet,
  onClick,
}: {
  wallet: CurrencyWallet
  onClick?: () => void
}) => {
  const isEmpty = CurrencyConverter.isWalletEmpty(wallet)
  const currencies = isEmpty
    ? []
    : CurrencyConverter.getDisplayCostFromWallet(wallet)
  const lastIndex = currencies.length - 1

  return (
    <span className='cursor-pointer text-lg' onClick={onClick}>
      {isEmpty && '0sp'}
      {currencies.map(([number, unit], index) => {
        return (
          <span key={unit} className='mr-1'>
            <strong>{number}</strong> {unit}
            {index !== lastIndex ? ',' : null}
          </span>
        )
      })}
    </span>
  )
}

export default CostFragment
