import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { render, screen } from '@testing-library/react'
import React from 'react'

import DataGrid from '@/components/DataGrid/DataGrid'
import type { DataGridColumn } from '@/components/DataGrid/types'
import type { InventoryItem } from '@/domain/inventory'
import type { FirearmWeaponItem } from '@/domain/weapon'
import { firearmWeaponItemMock1 } from '@/shared/mocks/inventoryMocks'

type Item = InventoryItem<FirearmWeaponItem>

const columns: ReadonlyArray<DataGridColumn<Item>> = [
  { key: 'name', title: 'Name' },
]

describe('DataGrid', () => {
  i18n.load('en', {})
  i18n.activate('en')

  it('renders inventory items with the same name without key warnings', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation()
    // Same firearm, different variants => same name, different inventoryId
    const data: Array<Item> = [
      firearmWeaponItemMock1,
      { ...firearmWeaponItemMock1, inventoryId: '10', isRifled: true },
    ]

    render(
      <I18nProvider i18n={i18n}>
        <DataGrid<Item>
          data={data}
          columns={columns}
          spanDetails={1}
          initialSortState={{ key: '' as keyof Item, direction: 'asc' }}
          noFilter
        />
      </I18nProvider>,
    )

    expect(screen.getAllByText(firearmWeaponItemMock1.name)).toHaveLength(2)
    expect(consoleError).not.toHaveBeenCalledWith(
      expect.stringContaining('Encountered two children with the same key'),
      expect.anything(),
      expect.anything(),
    )
    consoleError.mockRestore()
  })
})
