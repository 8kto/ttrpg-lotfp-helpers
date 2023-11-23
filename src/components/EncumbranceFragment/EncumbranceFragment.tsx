import React from 'react'

import { getEncumbrance } from '@/components/InventoryDetails/helpers'

const EncumbranceFragment = ({
  encumbrancePoints,
}: {
  encumbrancePoints: number
}) => {
  // TODO translate
  const encumbrance = getEncumbrance(encumbrancePoints)

  return (
    <>
      {encumbrance} ({encumbrancePoints.toPrecision(2)})
    </>
  )
}

export default EncumbranceFragment
