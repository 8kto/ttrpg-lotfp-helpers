import { useMemo } from 'react'

import EncumbranceService from '@/shared/services/EncumbranceService'
import { combineEquipment } from '@/state/helpers'
import { useInventoryState } from '@/state/InventoryState'

/**
 * Total cost and encumbrance points of the current inventory
 */
const useEncumbranceTotals = () => {
  const { state: equipmentState } = useInventoryState()

  return useMemo(() => {
    const { encumbranceThreshold, isCoinWeightActive, wallet } = equipmentState

    const encumbranceService = new EncumbranceService({
      threshold: encumbranceThreshold.get(),
    })

    return encumbranceService.getTotal(
      combineEquipment(equipmentState),
      isCoinWeightActive.get() ? wallet.get() : null,
    )
  }, [equipmentState])
}

export default useEncumbranceTotals
