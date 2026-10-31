import '@testing-library/jest-dom'

import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import TooltipTerm from '@/components/TooltipTerm/TooltipTerm'

// jsdom has no PointerEvent, so pointerType would be lost
class PointerEventMock extends MouseEvent {
  pointerType: string

  constructor(type: string, params: PointerEventInit = {}) {
    super(type, params)
    this.pointerType = params.pointerType ?? ''
  }
}

describe('TooltipTerm', () => {
  beforeAll(() => {
    window.PointerEvent ??= PointerEventMock as typeof PointerEvent
  })

  const renderTerm = () =>
    render(<TooltipTerm hint='Hint text'>Matchlock</TooltipTerm>)

  it('renders the term without an icon and hides the hint initially', () => {
    renderTerm()
    expect(screen.getByText('Matchlock')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows the hint on mouse hover', () => {
    renderTerm()
    const term = screen.getByText('Matchlock')

    fireEvent.pointerEnter(term, { pointerType: 'mouse' })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Hint text')

    fireEvent.pointerLeave(term, { pointerType: 'mouse' })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('toggles the hint on tap', () => {
    renderTerm()
    const term = screen.getByText('Matchlock')

    fireEvent.pointerUp(term, { pointerType: 'touch' })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Hint text')

    fireEvent.pointerUp(term, { pointerType: 'touch' })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('closes on tap elsewhere (focus loss)', () => {
    renderTerm()
    const term = screen.getByText('Matchlock')

    fireEvent.pointerUp(term, { pointerType: 'touch' })
    act(() => {
      fireEvent.blur(term)
    })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
