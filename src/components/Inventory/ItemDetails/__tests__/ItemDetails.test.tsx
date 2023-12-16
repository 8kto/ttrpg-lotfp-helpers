import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import React from 'react'

import ItemDetails from '@/components/Inventory/ItemDetails/ItemDetails'

describe('<ItemDetails />', () => {
  const mockItem = {
    name: 'Test Item',
    qty: 2,
    details: 'Some details about the item',
  }

  it('renders item name', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
      />,
    )
    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })

  it('renders quantity fragment for items with qty > 1', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
      />,
    )
    expect(screen.getByTestId('item-qty')).toBeInTheDocument()
  })

  it('renders item details line', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
        compact={false}
      />,
    )
    expect(screen.getByText('Some details about the item')).toBeInTheDocument()
  })

  it('does not render details block when showDetailsBlock is false', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
        showDetailsBlock={false}
      />,
    )
    const details = screen.queryByText('Some details about the item')
    expect(details).not.toBeVisible()
  })

  it('renders details block when showDetailsBlock is true', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
        showDetailsBlock={true}
      />,
    )
    expect(screen.getByText('Some details about the item')).toBeInTheDocument()
  })
})
