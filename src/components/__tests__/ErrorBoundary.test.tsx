import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { generateMessageId } from '@lingui/message-utils/generateMessageId'
import { I18nProvider } from '@lingui/react'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import ErrorBoundary from '@/components/ErrorBoundary'

i18n.loadAndActivate({
  locale: 'ru',
  messages: { [generateMessageId('Bad things happened')]: 'Случилась беда' },
})

const Broken = (): React.ReactNode => {
  throw new Error('Broken render')
}

describe('ErrorBoundary', () => {
  const { location } = window

  const renderBroken = () =>
    render(
      <I18nProvider i18n={i18n}>
        <ErrorBoundary>
          <Broken />
        </ErrorBoundary>
      </I18nProvider>,
    )

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
    // @ts-expect-error jsdom does not allow spying on the location methods
    delete window.location
    window.location = { ...location, reload: jest.fn() }
    localStorage.setItem('lotfp-helpers', '{"armor":null}')
  })

  afterEach(() => {
    window.location = location
    jest.restoreAllMocks()
  })

  it('translates its message', () => {
    renderBroken()

    expect(screen.getByText('Случилась беда')).toBeInTheDocument()
  })

  it('removes the saved inventory once the reset is confirmed', () => {
    window.confirm = jest.fn(() => true)
    renderBroken()

    fireEvent.click(screen.getByRole('button', { name: 'Reset saved data' }))

    expect(localStorage.getItem('lotfp-helpers')).toBeNull()
    expect(window.location.reload).toHaveBeenCalled()
  })

  it('keeps the saved inventory if the reset is declined', () => {
    window.confirm = jest.fn(() => false)
    renderBroken()

    fireEvent.click(screen.getByRole('button', { name: 'Reset saved data' }))

    expect(localStorage.getItem('lotfp-helpers')).not.toBeNull()
  })
})
