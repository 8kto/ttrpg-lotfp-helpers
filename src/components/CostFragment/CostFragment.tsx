import React from 'react'

import { getCoins } from '@/components/CostFragment/helpers'

const CostFragment = ({ cost }: { cost: number }) => {
  const { copperPoints, silverPoints } = getCoins(cost)

  return (
    <>
      <strong>{silverPoints}</strong> sp
      {Boolean(copperPoints) ? (
        <>
          , <strong>{copperPoints}</strong> cp
        </>
      ) : null}
    </>
  )
}

export default CostFragment
