import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'

import AddEquipmentItemFragment from '@/components/Inventory/AddEquipmentItemFragment/AddEquipmentItemFragment'
import {
  getInitialInventoryState,
  InventoryState,
  setState,
} from '@/state/InventoryState'

i18n.loadAndActivate({ locale: 'en', messages: {} })

const getCurrencyRadio = (container: HTMLElement, currency: string) =>
  container.querySelector<HTMLInputElement>(`#add-equip-item--is${currency}`)!

const submitItemCosting = async (container: HTMLElement, cost: string) => {
  fireEvent.change(container.querySelector('#add-equip-item--name')!, {
    target: { value: 'Idol' },
  })
  fireEvent.change(container.querySelector('#add-equip-item--cost')!, {
    target: { value: cost },
  })
  fireEvent.submit(container.querySelector('form')!)

  await waitFor(() => expect(InventoryState.miscEquipment.length).toBe(1))

  return InventoryState.miscEquipment[0].get().lockedCostCp
}

describe('AddEquipmentItemFragment', () => {
  const renderForm = () =>
    render(
      <I18nProvider i18n={i18n}>
        <AddEquipmentItemFragment onClose={jest.fn()} />
      </I18nProvider>,
    ).container

  beforeEach(() => {
    setState(getInitialInventoryState())
  })

  it('should use silver by default', async () => {
    const container = renderForm()

    expect(getCurrencyRadio(container, 'Silver').checked).toBe(true)
    expect(await submitItemCosting(container, '10')).toBe(100)
  })

  it('should keep the selected currency in sync with the cost', async () => {
    const container = renderForm()

    fireEvent.click(getCurrencyRadio(container, 'Gold'))
    await waitFor(() =>
      expect(getCurrencyRadio(container, 'Gold').checked).toBe(true),
    )
    fireEvent.click(getCurrencyRadio(container, 'Silver'))
    await waitFor(() =>
      expect(getCurrencyRadio(container, 'Silver').checked).toBe(true),
    )

    expect(await submitItemCosting(container, '10')).toBe(100)
  })

  it('should label the weight field', () => {
    const { container, getByLabelText } = render(
      <I18nProvider i18n={i18n}>
        <AddEquipmentItemFragment onClose={jest.fn()} />
      </I18nProvider>,
    )

    expect(getByLabelText('Weight')).toBe(
      container.querySelector('#add-equip-item--points'),
    )
  })

  it('should allow switching back to copper', async () => {
    const container = renderForm()

    fireEvent.click(getCurrencyRadio(container, 'Copper'))
    await waitFor(() =>
      expect(getCurrencyRadio(container, 'Copper').checked).toBe(true),
    )

    expect(await submitItemCosting(container, '10')).toBe(10)
  })
})
