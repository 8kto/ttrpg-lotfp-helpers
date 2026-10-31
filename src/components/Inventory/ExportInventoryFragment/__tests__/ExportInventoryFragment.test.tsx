import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'

import ExportInventoryFragment from '@/components/Inventory/ExportInventoryFragment/ExportInventoryFragment'
import Action from '@/shared/actions/actions'
import { subscribe } from '@/shared/actions/helpers'
import { armorItemMock1 } from '@/shared/mocks/inventoryMocks'
import { stateMock } from '@/shared/mocks/stateMock'
import {
  getInitialInventoryState,
  InventoryState,
  setState,
} from '@/state/InventoryState'

jest.mock('next/router', () => ({
  useRouter: () => ({ asPath: '/inventory', locale: 'en' }),
}))

i18n.loadAndActivate({ locale: 'en', messages: {} })

describe('ExportInventoryFragment', () => {
  const currentState = {
    ...getInitialInventoryState(),
    armor: [armorItemMock1],
  }

  const importFile = (content: unknown, onClose = jest.fn()) => {
    const { container } = render(
      <I18nProvider i18n={i18n}>
        <ExportInventoryFragment onClose={onClose} />
      </I18nProvider>,
    )
    const file = new File([JSON.stringify(content)], 'export.json')

    fireEvent.change(container.querySelector('input[type=file]')!, {
      target: { files: [file] },
    })

    return onClose
  }

  beforeEach(() => {
    setState(currentState)
  })

  it('replaces the inventory with a valid file', async () => {
    const onClose = importFile(stateMock)

    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(InventoryState.wallet.get()).toEqual(stateMock.wallet)
  })

  it('keeps the inventory and shows an error for a malformed file', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
    const onToast = jest.fn()
    const unsubscribe = subscribe(Action.ShowToast, onToast)

    importFile({ armor: null })

    await waitFor(() => expect(onToast).toHaveBeenCalled())
    expect(InventoryState.armor.get()).toEqual(currentState.armor)
    unsubscribe()
  })
})
