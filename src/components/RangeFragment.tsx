import React from 'react'

import type { Range } from '@/domain/weapon'
import { t } from '@/locale/helpers'

const RangeFragment = ({
  range,
  compact = false,
}: {
  range: Range | null
  compact?: boolean
}) => {
  if (!range) {
    return t('-')
  }

  if (compact) {
    return (
      <span>
        {range.short}/{range.medium}/{range.long}
      </span>
    )
  } else {
    return (
      <ul>
        <li>
          {t('Short')}: {range.short} {t('ft')}
        </li>
        <li>
          {t('Medium')}: {range.medium} {t('ft')}
        </li>
        <li>
          {t('Long')}: {range.long} {t('ft')}
        </li>
      </ul>
    )
  }
}

export default RangeFragment
