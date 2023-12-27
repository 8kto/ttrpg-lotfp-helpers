import { t, Trans } from '@lingui/macro'
import React from 'react'

import type { FirearmWeaponItem } from '@/domain/weapon'

const FirearmTraitsFragment = ({ item }: { item: FirearmWeaponItem }) => {
  return (
    <>
      {item.isTwoHanded && (
        <p
          title={t`weapons.melee.twoHanded`}
          className='ph-color-muted text-sm'
        >
          <Trans>Two-handed</Trans>
        </p>
      )}
    </>
  )
}

export default FirearmTraitsFragment
