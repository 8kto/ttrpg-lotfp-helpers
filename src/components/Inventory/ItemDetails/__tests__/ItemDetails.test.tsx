import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { act, render, screen } from '@testing-library/react'
import React from 'react'

import ItemDetails from '@/components/Inventory/ItemDetails/ItemDetails'
import { ArmorType } from '@/domain/armor'
import { EncumbranceUnit } from '@/domain/encumbrance'

const TestingProvider = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider i18n={i18n}>{children}</I18nProvider>
)

describe('<ItemDetails />', () => {
  const mockItem = {
    armorClass: 14,
    cityCost: 25,
    inventoryId: '1',
    lockedCostCp: 50,
    name: 'Leather',
    points: EncumbranceUnit.None,
    ruralCost: 50,
    type: ArmorType.Armor,
    qty: 2,
    details: 'Some details about the item',
  }

  i18n.load('en', {})
  i18n.activate('en')
  beforeEach(() => {
    act(() => {
      i18n.activate('en')
    })
  })

  it('renders item name', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
      />,
      { wrapper: TestingProvider },
    )
    expect(screen.getByText('Leather')).toBeVisible()
  })

  it('renders quantity fragment for items with qty > 1', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
      />,
      { wrapper: TestingProvider },
    )
    expect(screen.getByTestId('item-qty')).toBeVisible()
  })

  it('does not render quantity fragment for items with qty = 1', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={{ ...mockItem, qty: 1 }}
      />,
      { wrapper: TestingProvider },
    )
    expect(screen.queryByTestId('item-qty')).not.toBeInTheDocument()
  })

  it('renders item details line', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
        compact={false}
      />,
      { wrapper: TestingProvider },
    )
    expect(screen.getByText('Some details about the item')).toBeInTheDocument()
    expect(screen.getByText('Some details about the item')).not.toBeVisible()
  })

  it('does not render details block when showDetailsBlock is false', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
        showDetailsBlock={false}
      />,
      { wrapper: TestingProvider },
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
      { wrapper: TestingProvider },
    )
    expect(screen.getByText('Some details about the item')).toBeInTheDocument()
    expect(screen.getByText('Some details about the item')).not.toBeVisible()
  })

  it('renders item name in compact mode', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
        compact={true}
      />,
      { wrapper: TestingProvider },
    )
    expect(screen.getByText('Leather')).toBeInTheDocument()
  })

  it('renders quantity fragment in compact mode for items with qty > 1', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
        compact={true}
      />,
      { wrapper: TestingProvider },
    )
    expect(screen.getByTestId('item-qty')).toBeVisible()
  })

  it('does not render quantity', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={{ ...mockItem, qty: undefined }}
        compact={true}
      />,
      { wrapper: TestingProvider },
    )
    expect(screen.queryByTestId('item-qty')).toBeNull()
  })

  it('does not render item details line in compact mode', () => {
    render(
      <ItemDetails
        // @ts-ignore
        item={mockItem}
        compact={true}
      />,
      { wrapper: TestingProvider },
    )
    const details = screen.queryByText('Some details about the item')
    expect(details).not.toBeVisible()
  })
})
