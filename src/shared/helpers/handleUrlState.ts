import getStateFromSearchString from '@/shared/helpers/getStateFromSearchString'
import { getInitialInventoryState, InventoryState } from '@/state/InventoryState'

const handleUrlState = () => {
  const hash =
    typeof window !== 'undefined' ? window.location.hash.substring(1) : ''
  const searchParams = new URLSearchParams(hash)
  const urlState = searchParams.get('inventory')

  let state: string | null
  
  try {
    state = JSON.stringify(InventoryState.get())
  } catch (err) {
    console.error(err)

    return
  }

  const params = getStateFromSearchString(state, getInitialInventoryState())

  console.log(params)
}

export default handleUrlState
