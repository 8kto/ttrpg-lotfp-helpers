import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import AddCoinsFragment from '@/components/Inventory/AddCoinsFragment/AddCoinsFragment'
import SetCoinsFragment from '@/components/Inventory/SetCoinsFragment/SetCoinsFragment'

i18n.loadAndActivate({ locale: 'en', messages: {} })

describe('Coin forms', () => {
  it.each([
    ['AddCoinsFragment', AddCoinsFragment],
    ['SetCoinsFragment', SetCoinsFragment],
  ])('%s explains an invalid value', async (_, Fragment) => {
    render(
      <I18nProvider i18n={i18n}>
        <Fragment onClose={jest.fn()} />
      </I18nProvider>,
    )
    const goldInput = screen.getByLabelText('Gold pieces')

    fireEvent.change(goldInput, { target: { name: 'gold', value: '-1' } })
    fireEvent.submit(goldInput.closest('form')!)

    expect(
      await screen.findByText(
        'The number should be equal to or greater than 0',
      ),
    ).toBeVisible()
  })
})
