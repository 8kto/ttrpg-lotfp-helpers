import { t } from '@lingui/macro'

import { decompressDataFromUrl } from '@/shared/helpers/compressDataForUrl'
import { setState } from '@/state/InventoryState'
import { parseInventoryState } from '@/state/parseInventoryState'

/**
 * A link can be opened by accident and replaces the only copy of the inventory,
 * so it needs the user's consent
 */
export const importSharedInventory = (compressedState: string) => {
  const state = parseInventoryState(decompressDataFromUrl(compressedState))

  if (!state) {
    alert(t`This link does not contain a valid inventory.`)
  } else if (confirm(t`Replace your current inventory with the shared one?`)) {
    setState(state)
  }
}
