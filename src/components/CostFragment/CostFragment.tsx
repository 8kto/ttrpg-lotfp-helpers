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
    <span onClick={onClick}>
      {isEmpty && <span className='ph-currency-unit--sp'>0 sp</span>}
      {currencies.map(([number, unit], index) => {
        return (
          <span key={unit} className='mr-1'>
            <strong>{roundTo(number, 1)}</strong>{' '}
            <span className={`ph-currency-unit--${unit}`}>{unit}</span>
            {index !== lastIndex ? ',' : null}
          </span>
        )
      })}
    </span>
  )
}

export default CostFragment
