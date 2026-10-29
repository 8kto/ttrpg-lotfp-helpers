import { Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'

import { FiringMechanismLabels } from '@/config/Firearms'
import type { FirearmWeaponItem } from '@/domain/weapon'

const FirearmMechanismFragment = ({ item }: { item: FirearmWeaponItem }) => {
  const { _: trans } = useLingui()

  return (
    <>
      {trans(FiringMechanismLabels[item.firingMechanism])}
      {item.isRifled && (
        <>
          , <Trans>rifled</Trans>
        </>
      )}
    </>
  )
}

export default FirearmMechanismFragment
