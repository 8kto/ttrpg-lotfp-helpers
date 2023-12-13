import { useLingui } from '@lingui/react'
import React from 'react'

import { getEncumbrance } from '@/components/InventoryDetails/helpers'

const EncumbranceFragment = ({
  encumbrancePoints,
}: {
  encumbrancePoints: number
}) => {
  const { i18n } = useLingui()
  const encumbrance = getEncumbrance(encumbrancePoints)

  // TODO plurals for feet
  return (
    <>
      {i18n._(encumbrance)} ({encumbrancePoints.toPrecision(2)})
    </>
  )
}

export default EncumbranceFragment
