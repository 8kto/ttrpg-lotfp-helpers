import React from 'react'

import type { CurrencyWallet } from '@/domain/currency'
import CurrencyConverter from '@/shared/services/CurrencyConverter'

const CostFragment = ({
  wallet,
  onClick,
  optimize = false,
}: {
  wallet: CurrencyWallet
  onClick?: () => void
  optimize?: boolean
}) => {
  const isEmpty = CurrencyConverter.isWalletEmpty(wallet)

  let currencies: ReturnType<typeof CurrencyConverter.getDisplayCostFromWallet>
  if (isEmpty) {
    currencies = []
  } else {
    const finalWallet = optimize
      ? CurrencyConverter.getNormalized(wallet)
      : wallet
    currencies = CurrencyConverter.getDisplayCostFromWallet(finalWallet)
  }
  const lastIndex = currencies.length - 1

  // FIXME unit is corrupted when deployed
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
