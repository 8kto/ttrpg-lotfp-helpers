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
      {process.env.NODE_ENV === 'development' ? (
        <span className='text-gray-400'>
          ({encumbrancePoints.toPrecision(2)} e.u. /{' '}
          {EncumbranceService.getReadableEncumbrance(
            encumbrancePoints /*  + 5 * EncumbrancePoint.Regular */,
          )}{' '}
          e.p.)
        </span>
      ) : (
        EncumbranceService.getReadableEncumbrance(
          encumbrancePoints /*  + 5 * EncumbrancePoint.Regular */,
        )
      )}
    </>
  )
}

export default EncumbranceFragment
