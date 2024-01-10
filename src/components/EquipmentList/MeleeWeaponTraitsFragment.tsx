import { t, Trans } from '@lingui/macro'
import React from 'react'

import type { MeleeWeaponItem } from '@/domain/weapon'

const MeleeWeaponTraitsFragment = ({ item }: { item: MeleeWeaponItem }) => {
  return (
    <>
      {item.isSecondRank && (
        <p
          title={t`weapons.melee.secondRank`}
          className='ph-color-muted text-sm'
        >
          <Trans>Second rank</Trans>
        </p>
      )}
      {item.isTwoHanded && (
        <p
          title={t`weapons.melee.twoHanded`}
          className='ph-color-muted text-sm'
        >
          <Trans>Two-handed</Trans>
        </p>
      )}
      {item.isAbleToReceiveCharge && (
        <p title={t`weapons.melee.charge`} className='ph-color-muted text-sm'>
          <Trans>Receives charge</Trans>
        </p>
      )}
    </>
  )
}

export default MeleeWeaponTraitsFragment
