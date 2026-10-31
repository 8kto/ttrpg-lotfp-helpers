import { compressDataForUrl } from '@/shared/helpers/compressDataForUrl'
import { importSharedInventory } from '@/shared/helpers/importSharedInventory'
import { armorItemMock1 } from '@/shared/mocks/inventoryMocks'
import { stateMock } from '@/shared/mocks/stateMock'
import {
  getInitialInventoryState,
  InventoryState,
  setState,
} from '@/state/InventoryState'

describe('importSharedInventory', () => {
  const currentState = {
    ...getInitialInventoryState(),
    armor: [armorItemMock1],
  }

  beforeEach(() => {
    setState(currentState)
    window.confirm = jest.fn(() => true)
    window.alert = jest.fn()
  })

  it('replaces the inventory once the user confirms', () => {
    importSharedInventory(compressDataForUrl(stateMock))

    expect(window.confirm).toHaveBeenCalledTimes(1)
    expect(InventoryState.wallet.get()).toEqual(stateMock.wallet)
  })

  it('keeps the inventory if the user declines', () => {
    ;(window.confirm as jest.Mock).mockReturnValue(false)

    importSharedInventory(compressDataForUrl(stateMock))

    expect(InventoryState.armor.get()).toEqual(currentState.armor)
  })

  it('keeps the inventory and warns about malformed data', () => {
    importSharedInventory(compressDataForUrl({ armor: null }))

    expect(window.confirm).not.toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(InventoryState.armor.get()).toEqual(currentState.armor)
  })

  it('warns about a link that cannot be decompressed', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined)

    importSharedInventory('not-a-compressed-state')

    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(InventoryState.armor.get()).toEqual(currentState.armor)
  })
})
