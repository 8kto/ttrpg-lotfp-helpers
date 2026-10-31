import '@testing-library/jest-dom'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { act, render, screen } from '@testing-library/react'
import React from 'react'

import { Details } from '@/components/Inventory/ItemDetails/Details'
import { ArmorType } from '@/domain/armor'
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

    it('does not interpret markup in item details', () => {
      const details = '<img src=x onerror="alert(1)"><b>bold</b>'

      render(<Details item={{ ...armorItemMock1, details }} />, {
        wrapper: TestingProvider,
      })

      const detailsNode = screen.getByTestId('details--details')
      expect(detailsNode.textContent).toEqual(details)
      expect(detailsNode.querySelector('img, b')).toBeNull()
    })

    it.each(['<br/>', '<br />', '<br>'])(
      'keeps the %s line break of the catalog details',
      (lineBreak) => {
        const details = `First line.${lineBreak}Second line.`

        render(<Details item={{ ...armorItemMock1, details }} />, {
          wrapper: TestingProvider,
        })

        const detailsNode = screen.getByTestId('details--details')
        expect(detailsNode.querySelectorAll('br')).toHaveLength(1)
        expect(detailsNode.textContent).toEqual('First line.Second line.')
      },
    )

    it('displays armor class for armor items', () => {
      render(<Details item={armorItemMock1} />, { wrapper: TestingProvider })
      expect(screen.getByTestId('details--ac')).toBeVisible()
      expect(screen.getByTestId('details--ac').textContent).toEqual(
        'Armor Class: 14',
      )
    })

    it('displays the physical damage save bonus for helmets', () => {
      render(
        <Details
          item={{
            ...armorItemMock1,
            armorClass: '+1',
            physicalSaveBonus: 2,
            type: ArmorType.Accessory,
          }}
        />,
        { wrapper: TestingProvider },
      )
      expect(screen.getByTestId('details--physical-save').textContent).toEqual(
        'Saving throws vs physical damage: +2',
      )
    })

    it('does not display the save bonus for regular armor', () => {
      render(<Details item={armorItemMock1} />, { wrapper: TestingProvider })
      expect(
        screen.queryByTestId('details--physical-save'),
      ).not.toBeInTheDocument()
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
        'RangeShort: 50 ftMedium: 100 ft (-4 AB)Long: 600 ft (-8 AB)' +
          'Dexterity to-hit modifiers do not apply at Medium and Long range.',
      )
    })

    it('displays regular range penalties for rifled firearms', () => {
      render(<Details item={{ ...firearmWeaponItemMock1, isRifled: true }} />, {
        wrapper: TestingProvider,
      })
      expect(screen.getByTestId('details--firearms').textContent).toEqual(
        'RangeShort: 50 ftMedium: 100 ft (-2 AB)Long: 600 ft (-4 AB)' +
          'Dexterity to-hit modifiers do not apply at Medium and Long range.',
      )
    })

    it('displays reload, misfire and armor piercing for a matchlock', () => {
      render(<Details item={firearmWeaponItemMock1} />, {
        wrapper: TestingProvider,
      })
      expect(screen.getByTestId('details--reload').textContent).toEqual(
        'Reload: 10 rounds (8 for Fighters) + Encumbrance (now 0) – Dexterity modifier',
      )
      expect(screen.getByTestId('details--misfire').textContent).toEqual(
        'Misfire: 2 in 10; damp 4 in 10, rain 8 in 10',
      )
      expect(screen.getByTestId('details--armor-piercing').textContent).toEqual(
        'Armor piercing: ignores 5 points of armor at Short range',
      )
      expect(screen.queryByTestId('details--club')).not.toBeInTheDocument()
    })

    it('displays reload modifiers for a rifled flintlock', () => {
      render(
        <Details
          item={{
            ...firearmWeaponItemMock1,
            firingMechanism: FiringMechanism.Flintlock,
            isRifled: true,
          }}
        />,
        { wrapper: TestingProvider },
      )
      expect(screen.getByTestId('details--reload').textContent).toEqual(
        'Reload: 10 rounds (8 for Fighters) + Encumbrance (now 0) – Dexterity modifier' +
          '; ×½ for flintlock (Fighters round down, others round up)' +
          '; ×1.5 for rifled barrel (round to the nearest)',
      )
      expect(screen.getByTestId('details--misfire').textContent).toEqual(
        'Misfire: 1 in 10; damp 2 in 10, rain 4 in 10',
      )
    })

    it('displays wheellock specifics', () => {
      render(
        <Details
          item={{
            ...firearmWeaponItemMock1,
            firingMechanism: FiringMechanism.Wheellock,
          }}
        />,
        { wrapper: TestingProvider },
      )
      expect(screen.getByTestId('details--misfire').textContent).toEqual(
        'Misfire: 2 in 10 in any weather',
      )
      expect(screen.getByTestId('details--club').textContent).toEqual(
        '1 in 4 chance to break the mechanism if used as a club.',
      )
    })

    it('displays armor piercing at all ranges for muskets', () => {
      render(
        <Details
          item={{ ...firearmWeaponItemMock1, isArmorPiercingAtAllRanges: true }}
        />,
        { wrapper: TestingProvider },
      )
      expect(screen.getByTestId('details--armor-piercing').textContent).toEqual(
        'Armor piercing: ignores 5 points of armor at all ranges',
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
