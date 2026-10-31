import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import Wallet from '@/components/Wallet/Wallet'
import {
  getInitialInventoryState,
  InventoryState,
  setState,
} from '@/state/InventoryState'

i18n.loadAndActivate({ locale: 'en', messages: {} })

describe('Wallet', () => {
  const wallet = { Copper: 1, Gold: 2, Silver: 3 }

  const clickReset = () => {
    render(
      <I18nProvider i18n={i18n}>
        <Wallet />
      </I18nProvider>,
    )
    fireEvent.click(screen.getByTitle('Reset coins'))
  }

  beforeEach(() => {
    setState({ ...getInitialInventoryState(), wallet })
  })

  it('keeps the coins if the reset is declined', () => {
    window.confirm = jest.fn(() => false)

    clickReset()

    expect(InventoryState.wallet.get()).toEqual(wallet)
  })

  it('resets the coins once confirmed', () => {
    window.confirm = jest.fn(() => true)

    clickReset()

    expect(InventoryState.wallet.get()).toEqual({
      Copper: 0,
      Gold: 0,
      Silver: 0,
    })
  })
})
