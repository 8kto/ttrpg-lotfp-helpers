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
  return (
    <span className='cursor-pointer text-lg' onClick={onClick}>
      {CurrencyConverter.isWalletEmpty(wallet)
        ? '0sp'
        : CurrencyConverter.getDisplayCostFromWallet(wallet)}
      {/*<strong>{silverPoints}</strong> sp*/}
      {/*{Boolean(copperPoints) ? (*/}
      {/*  <>*/}
      {/*    , <strong>{copperPoints}</strong> cp*/}
      {/*  </>*/}
      {/*) : null}*/}
    </span>
  )
}

export default CostFragment
