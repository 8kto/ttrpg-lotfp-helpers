import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { act, render, screen } from '@testing-library/react'
import React from 'react'

import { Details } from '@/components/Inventory/ItemDetails/Details'
import { FiringMechanism } from '@/domain/firearms'
import {
  armorItemMock1,
  firearmWeaponItemMock1,
  meleeWeaponItemMock2,
  missileWeaponItemMock1,
} from '@/shared/mocks/inventoryMocks'

describe('Details component', () => {
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
        'RangeShort: 20 ftMedium: 50 ft (-2 AB)Long: 80 ft (-4 AB)',
      )
    })

    it('displays ranged and mêlée damage for firearm items', () => {
      render(<Details item={firearmWeaponItemMock1} />, {
        wrapper: TestingProvider,
      })
      expect(screen.getByTestId('details--damage').textContent).toEqual(
        'Damage: d8',
      )
      expect(screen.getByTestId('details--damage-melee').textContent).toEqual(
        'Mêlée damage: d6',
      )
    })

    it('displays doubled range penalties for smoothbore firearms', () => {
      render(<Details item={firearmWeaponItemMock1} />, {
        wrapper: TestingProvider,
      })
      expect(screen.getByTestId('details--firearms').textContent).toEqual(
        'RangeShort: 50 ftMedium: 100 ft (-4 AB)Long: 600 ft (-8 AB)',
      )
    })

    it('displays regular range penalties for rifled firearms', () => {
      render(<Details item={{ ...firearmWeaponItemMock1, isRifled: true }} />, {
        wrapper: TestingProvider,
      })
      expect(screen.getByTestId('details--firearms').textContent).toEqual(
        'RangeShort: 50 ftMedium: 100 ft (-2 AB)Long: 600 ft (-4 AB)',
      )
    })

    it('displays firing mechanism for firearm items', () => {
      render(<Details item={firearmWeaponItemMock1} />, {
        wrapper: TestingProvider,
      })
      expect(screen.getByTestId('details--mechanism').textContent).toEqual(
        'Firearm mechanism: Matchlock',
      )
    })

    it('displays rifling for rifled firearm items', () => {
      render(
        <Details
          item={{
            ...firearmWeaponItemMock1,
            firingMechanism: FiringMechanism.Wheellock,
            isRifled: true,
          }}
        />,
        { wrapper: TestingProvider },
      )
      expect(screen.getByTestId('details--mechanism').textContent).toEqual(
        'Firearm mechanism: Wheellock, rifled',
      )
    })
  })
})
