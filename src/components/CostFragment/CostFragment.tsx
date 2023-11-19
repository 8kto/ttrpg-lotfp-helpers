import React from 'react'

import { getCoins } from '@/components/CostFragment/helpers'

const CostFragment = ({
  cost,
  onClick,
  copperPieces = false,
}: {
  cost: number
  onClick?: () => void
  copperPieces?: boolean
}) => {
  const costSilver = copperPieces ? cost / 10 : cost
  const { copperPoints, silverPoints } = getCoins(costSilver)

  return (
    <span onClick={onClick}>
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
