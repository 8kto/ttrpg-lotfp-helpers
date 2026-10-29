import { Trans } from '@lingui/macro'
import React from 'react'

import { getMisfireChances } from '@/config/Firearms'
import { FiringMechanism } from '@/domain/firearms'
import type { FirearmWeaponItem } from '@/domain/weapon'
import useEncumbranceTotals from '@/shared/hooks/useEncumbranceTotals'
import EncumbranceService from '@/shared/services/EncumbranceService'

/**
 * Firearm rules that depend on the firing mechanism and rifling
 */
const FirearmRulesFragment = ({
  item,
  paragraphClassname,
}: {
  item: FirearmWeaponItem
  paragraphClassname: string
}) => {
  const { totalEncumbrancePoints } = useEncumbranceTotals()

  // Custom inventory items may not specify a firing mechanism.
  if (!Object.values(FiringMechanism).includes(item.firingMechanism)) {
    return null
  }

  const encumbrance = EncumbranceService.getReadableEncumbrance(
    totalEncumbrancePoints,
  )
  const { dry, damp, wet } = getMisfireChances(item.firingMechanism)
  const isWheellock = item.firingMechanism === FiringMechanism.Wheellock

  return (
    <>
      <p className={paragraphClassname} data-testid='details--reload'>
        <strong>
          <Trans>Reload</Trans>
        </strong>
        :{' '}
        <Trans>
          10 rounds (8 for Fighters) + Encumbrance (now {encumbrance}) –
          Dexterity modifier
        </Trans>
        {item.firingMechanism === FiringMechanism.Flintlock && (
          <>
            ;{' '}
            <Trans>
              ×½ for flintlock (Fighters round down, others round up)
            </Trans>
          </>
        )}
        {item.isRifled && (
          <>
            ; <Trans>×1.5 for rifled barrel (round to the nearest)</Trans>
          </>
        )}
      </p>
      <p className={paragraphClassname} data-testid='details--misfire'>
        <strong>
          <Trans>Misfire</Trans>
        </strong>
        :{' '}
        {isWheellock ? (
          <Trans>{dry} in 10 in any weather</Trans>
        ) : (
          <Trans>
            {dry} in 10; damp {damp} in 10, rain {wet} in 10
          </Trans>
        )}
      </p>
      <p className={paragraphClassname} data-testid='details--armor-piercing'>
        <strong>
          <Trans>Armor piercing</Trans>
        </strong>
        :{' '}
        {item.isArmorPiercingAtAllRanges ? (
          <Trans>ignores 5 points of armor at all ranges</Trans>
        ) : (
          <Trans>ignores 5 points of armor at Short range</Trans>
        )}
      </p>
      {isWheellock && (
        <p className={paragraphClassname} data-testid='details--club'>
          <Trans>1 in 4 chance to break the mechanism if used as a club.</Trans>
        </p>
      )}
    </>
  )
}

export default FirearmRulesFragment
