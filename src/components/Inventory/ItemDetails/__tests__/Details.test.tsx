import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { act, render, screen } from '@testing-library/react'
import React from 'react'

import { Details, Summary } from '@/components/Inventory/ItemDetails/Details'
import {
  armorItemMock1,
  meleeWeaponItemMock2,
  missileWeaponItemMock1,
} from '@/shared/mocks/inventoryMocks'

describe('Details component', () => {
  describe('Summary', () => {
    it('displays item name and quantity', () => {
      const mockItem = { name: 'Sword', qty: 2 }
      render(
        <Summary
          // @ts-ignore
          item={mockItem}
        />,
      )
      expect(screen.getByText('Sword')).toBeInTheDocument()
      expect(screen.getByTestId('item-qty')).toBeVisible()
      expect(screen.getByTestId('item-qty').textContent).toEqual('2')
    })

    it('does not display ItemDetailsLine in compact mode', () => {
      const mockItem = { name: 'Sword', qty: 1 }
      render(
        <Summary
          // @ts-ignore
          item={mockItem}
          compact={true}
        />,
      )
      expect(screen.queryByTestId('item-details-line')).toBeNull()
    })
  })

  describe('Details', () => {
    const TestingProvider = ({ children }: { children: React.ReactNode }) => (
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    )

    i18n.load('en', {})
    i18n.activate('en')
    beforeEach(() => {
      act(() => {
        i18n.activate('en')
      })
    })

    it('displays armor class for armor items', () => {
      render(<Details item={armorItemMock1} />, { wrapper: TestingProvider })
      expect(screen.getByTestId('details--ac')).toBeVisible()
      expect(screen.getByTestId('details--ac').textContent).toEqual(
        'Armor Class: 14',
      )
    })

    it('displays damage for weapon items', () => {
      render(<Details item={meleeWeaponItemMock2} />, {
        wrapper: TestingProvider,
      })
      expect(screen.getByTestId('details--damage')).toBeVisible()
      expect(screen.getByTestId('details--damage').textContent).toEqual(
        'Damage: d6',
      )
    })

    it('displays range for missile items', () => {
      render(<Details item={missileWeaponItemMock1} />, {
        wrapper: TestingProvider,
      })
      expect(screen.getByTestId('details--range')).toBeVisible()
      expect(screen.getByTestId('details--range').textContent).toEqual(
        'RangeShort: 20 ftMedium: 50 ftLong: 80 ft',
      )
    })
  })
})
