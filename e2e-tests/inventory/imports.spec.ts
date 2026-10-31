import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'
import { compressToEncodedURIComponent } from 'lz-string'

import { openInventory } from '../shared/helpers'

const STORAGE_KEY = 'lotfp-helpers'

const getMiscItem = (name: string, details: string | null = null) => ({
  categoryKey: 'miscEquipment',
  cityCostCp: 10,
  details,
  inventoryId: `${name}1`,
  lockedCostCp: 10,
  name,
  points: 0.2,
  qty: 1,
  ruralCostCp: 10,
})

const getStateWith = (name: string, details?: string) => ({
  miscEquipment: [getMiscItem(name, details)],
})

const seedInventory = async (page: Page) => {
  await page.goto('/inventory')
  await page.evaluate(
    ([key, value]) => localStorage.setItem(key, value),
    [STORAGE_KEY, JSON.stringify(getStateWith('Keepsake'))],
  )
}

const handleDialogs = (page: Page, shouldAccept: boolean) => {
  const messages: Array<string> = []

  page.on('dialog', async (dialog) => {
    messages.push(dialog.message())
    await (shouldAccept ? dialog.accept() : dialog.dismiss())
  })

  return messages
}

const openSharedLink = async (page: Page, state: unknown) => {
  const data = compressToEncodedURIComponent(JSON.stringify(state))

  await page.goto(`/inventory?import=${data}`)
  await page.waitForURL((url) => !url.search)
  await expect(page.getByTestId('CommandBar')).toBeVisible()
}

test.describe('Shared link import', () => {
  test.beforeEach(async ({ page }) => {
    await seedInventory(page)
  })

  test('should replace the inventory after a confirmation', async ({
    page,
  }) => {
    const messages = handleDialogs(page, true)

    await openSharedLink(page, getStateWith('Shared idol'))
    const inventory = await openInventory(page)

    expect(messages[0]).toBe(
      'Replace your current inventory with the shared one?',
    )
    await expect(inventory.getByText('Shared idol')).toBeVisible()
    await expect(inventory.getByText('Keepsake')).toBeHidden()
  })

  test('should keep the inventory when declined', async ({ page }) => {
    handleDialogs(page, false)

    await openSharedLink(page, getStateWith('Shared idol'))
    const inventory = await openInventory(page)

    await expect(inventory.getByText('Keepsake')).toBeVisible()
    await expect(inventory.getByText('Shared idol')).toBeHidden()
  })

  test('should reject malformed data and keep the app working', async ({
    page,
  }) => {
    const messages = handleDialogs(page, true)

    await openSharedLink(page, { armor: null })
    await page.reload()
    await expect(page.getByTestId('CommandBar')).toBeVisible()
    const inventory = await openInventory(page)

    expect(messages[0]).toBe('This link does not contain a valid inventory.')
    await expect(page.getByText('Bad things happened')).toBeHidden()
    await expect(inventory.getByText('Keepsake')).toBeVisible()
  })

  test('should not run markup from item details', async ({ page }) => {
    const details = '<img src=x onerror="window.isDetailsScriptRun = true">'
    handleDialogs(page, true)

    await openSharedLink(page, getStateWith('Cursed idol', details))
    const inventory = await openInventory(page)
    await inventory.getByText('Cursed idol').click()

    await expect(inventory.getByTestId('details--details')).toHaveText(details)
    expect(
      await page.evaluate(() => 'isDetailsScriptRun' in window),
    ).toBeFalsy()
  })
})

test.describe('File import', () => {
  const importFile = async (page: Page, content: unknown) => {
    await page.locator('input[type=file]').setInputFiles({
      buffer: Buffer.from(JSON.stringify(content)),
      mimeType: 'application/json',
      name: 'export.json',
    })
  }

  test.beforeEach(async ({ page }) => {
    await seedInventory(page)
    await page.reload()
    await expect(page.getByTestId('CommandBar')).toBeVisible()
  })

  test('should replace the inventory with a valid file', async ({ page }) => {
    await importFile(page, getStateWith('Imported idol'))
    const inventory = await openInventory(page)

    await expect(inventory.getByText('Imported idol')).toBeVisible()
    await expect(inventory.getByText('Keepsake')).toBeHidden()
  })

  test('should reject a malformed file with an error', async ({ page }) => {
    await importFile(page, { armor: null })

    await expect(
      page.getByText('This file does not contain a valid inventory.'),
    ).toBeVisible()
    await expect(page.getByText('Bad things happened')).toBeHidden()
    const inventory = await openInventory(page)
    await expect(inventory.getByText('Keepsake')).toBeVisible()
  })
})
