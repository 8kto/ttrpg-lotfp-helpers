import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { getCustomEquipmentItem } from '@/components/Inventory/AddEquipmentItemFragment/helpers'
import FirearmWeaponsInventoryGrid from '@/components/Inventory/FirearmWeaponsInventoryGrid'
import { CurrencyType } from '@/domain/currency'
import { EncumbranceUnit } from '@/domain/encumbrance'
import { addCustomEquipmentItem, setState } from '@/state/InventoryState'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider i18n={i18n}>{children}</I18nProvider>
)

beforeEach(() => {
  i18n.load('en', {})
  i18n.activate('en')
  act(() => setState({}))
})

it('renders and expands a custom firearm without inventing mechanism rules', () => {
  const item = getCustomEquipmentItem({
    name: 'Custom gun',
    category: 'firearmWeapons',
    points: EncumbranceUnit.Regular,
    cost: 0,
    currencyType: CurrencyType.Copper,
    details: 'Custom description',
  })
  act(() => addCustomEquipmentItem(item))
  render(<FirearmWeaponsInventoryGrid />, { wrapper })
  fireEvent.click(screen.getByText('Custom gun'))
  expect(screen.getByText('Custom description')).toBeVisible()
  expect(screen.queryByTestId('details--misfire')).not.toBeInTheDocument()
  expect(screen.queryByTestId('details--reload')).not.toBeInTheDocument()
})
