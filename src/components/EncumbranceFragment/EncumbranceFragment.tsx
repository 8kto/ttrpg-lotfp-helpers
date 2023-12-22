import { useLingui } from '@lingui/react'
import React from 'react'

import EncumbranceService from '@/shared/services/EncumbranceService'

const EncumbranceFragment = ({
  encumbrancePoints,
}: {
  encumbrancePoints: number
}) => {
  const { i18n } = useLingui()
  const encumbrance = EncumbranceService.getEncumbrance(encumbrancePoints)

  // TODO plurals for feet
  // TODO modal with FAQ about encumbrance
  return (
    <>
      {i18n._(encumbrance)}{' '}
      <span className='text-gray-400'>
        ({encumbrancePoints.toPrecision(2)})
      </span>
    </>
  )
}

export default EncumbranceFragment
