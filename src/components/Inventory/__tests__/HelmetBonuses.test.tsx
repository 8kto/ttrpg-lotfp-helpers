import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import ArmorGrid from '@/components/EquipmentList/ArmorGrid'
import ArmorInventoryGrid from '@/components/Inventory/ArmorInventoryGrid'
import { FirearmArmorItems } from '@/config/FirearmArmorItems'
import { getInventoryItem } from '@/shared/helpers/getInventoryItem'
import { setState } from '@/state/InventoryState'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nProvider i18n={i18n}>{children}</I18nProvider>
)

beforeEach(() => {
  i18n.load('en', {})
  i18n.activate('en')
  act(() => setState({}))
})

it.each(['Helm, Lobster Tail Pot', 'Helm, Morion'])(
  'exposes %s save bonus in both grids',
  (name) => {
    const item = FirearmArmorItems().find((armor) => armor.name === name)!
    const catalog = render(<ArmorGrid items={[item]} />, { wrapper })
    fireEvent.click(screen.getByText(name))
    expect(screen.getByTestId('details--physical-save')).toHaveTextContent(
      `+${item.physicalSaveBonus}`,
    )
    catalog.unmount()
    act(() => setState({ armor: [getInventoryItem(item, item.cityCostCp)] }))
    render(<ArmorInventoryGrid />, { wrapper })
    fireEvent.click(screen.getByText(name))
    expect(screen.getByTestId('details--physical-save')).toHaveTextContent(
      `+${item.physicalSaveBonus}`,
    )
  },
)
