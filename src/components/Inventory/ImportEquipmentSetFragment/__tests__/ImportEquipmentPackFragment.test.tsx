import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'

import ImportEquipmentPackFragment from '@/components/Inventory/ImportEquipmentSetFragment/ImportEquipmentPackFragment'
import { EquipmentPacks } from '@/config/EquipmentPacks'
import { getRandom } from '@/shared/helpers/getRandom'
import {
  getInitialInventoryState,
  InventoryState,
  setState,
} from '@/state/InventoryState'

jest.mock('@/shared/helpers/getRandom', () => ({ getRandom: jest.fn() }))

i18n.loadAndActivate({ locale: 'en', messages: {} })

describe('ImportEquipmentPackFragment', () => {
  beforeEach(() => {
    setState(getInitialInventoryState())
  })

  it('should import the randomly selected pack', async () => {
    const packKeys = Object.keys(EquipmentPacks)
    ;(getRandom as jest.Mock).mockReturnValue(packKeys.indexOf('Fighter1'))
    const onClose = jest.fn()

    const { getByText } = render(
      <I18nProvider i18n={i18n}>
        <ImportEquipmentPackFragment onClose={onClose} />
      </I18nProvider>,
    )
    fireEvent.click(getByText('Select random'))

    await waitFor(() => expect(InventoryState.armor.length).toBe(2))
    expect(InventoryState.armor.get().map(({ name }) => name)).toEqual([
      'Chain',
      'Shield',
    ])
    expect(InventoryState.miscEquipment.length).toBe(0)
    expect(onClose).toHaveBeenCalled()
  })
})
