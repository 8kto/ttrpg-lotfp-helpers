import '@testing-library/jest-dom'

import { act, render, screen } from '@testing-library/react'
import React from 'react'

import Toast from '@/components/Toast/Toast'
import Action from '@/shared/actions/actions'
import { dispatchAction } from '@/shared/actions/helpers'

describe('Toast', () => {
  const showToast = (message: string) =>
    act(() => {
      dispatchAction(Action.ShowToast, { delayMs: 1000, message })
    })

  const advanceTimers = (ms: number) =>
    act(() => {
      jest.advanceTimersByTime(ms)
    })

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('keeps a new message for its whole delay', () => {
    render(<Toast />)

    showToast('First')
    advanceTimers(900)
    showToast('Second')
    advanceTimers(500)

    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('visible')
  })

  it('hides the message after its delay', () => {
    render(<Toast />)

    showToast('First')
    advanceTimers(1200)

    expect(screen.queryByText('First')).not.toBeInTheDocument()
  })
})
