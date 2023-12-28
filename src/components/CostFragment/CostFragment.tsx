import React from 'react'

import type { CurrencyWallet } from '@/domain/currency'
import { roundTo } from '@/shared/helpers/roundTo'
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

  return (
    <span className='cursor-pointer text-lg' onClick={onClick}>
      {isEmpty && '0sp'}
      {currencies.map(([number, unit], index) => {
        return (
          <span key={unit} className='mr-1'>
            <strong>{roundTo(number, 1)}</strong> {unit}
            {index !== lastIndex ? ',' : null}
          </span>
        )
      })}
    </span>
  )
}

export default CostFragment
