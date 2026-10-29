import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import CommandBar from '@/components/CommandBar/CommandBar'
import {
  getInitialInventoryState,
  InventoryState,
} from '@/state/InventoryState'

describe('CommandBar', () => {
  i18n.load('en', {})
  i18n.activate('en')

  beforeEach(() => {
    act(() => {
      InventoryState.set(getInitialInventoryState())
    })
  })

  it('toggles the firearms campaign', () => {
    render(
      <I18nProvider i18n={i18n}>
        <CommandBar />
      </I18nProvider>,
    )
    const toggle = screen.getByRole('checkbox', { name: 'Firearms campaign' })

    expect(toggle).not.toBeChecked()
    fireEvent.click(toggle)
    expect(InventoryState.isFirearmsCampaign.get()).toEqual(true)
    expect(toggle).toBeChecked()
  })
})
