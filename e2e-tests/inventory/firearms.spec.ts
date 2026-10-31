import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { openEquipment, openInventory } from '../shared/helpers'

const openFirearmsTab = async (page: Page) => {
  await page.getByTestId('Tab-firearm').click()
}

const toggleFirearmsCampaign = async (page: Page) => {
  await page.getByText('Firearms campaign', { exact: true }).click()
}

const getCampaignSwitch = (page: Page) =>
  page.getByRole('checkbox', { name: 'Firearms campaign' })

/* The gear grid has a Pistol brace, the row name must not match it */
const pistolRowName = /^Pistol(?! brace)/

const getEquipmentRow = (page: Page, name: string | RegExp) =>
  page
    .getByTestId('DataGrid__Table')
    .first()
    .getByRole('row', {
      name: typeof name === 'string' ? new RegExp(`^${name}`) : name,
    })

const getAddButton = (row: Locator) => row.getByRole('button').last()

const buyPistol = async (page: Page) => {
  await getAddButton(getEquipmentRow(page, pistolRowName)).click()
}

test.describe('Firearms Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory')
    await expect(page.getByTestId('CommandBar')).toBeVisible()
  })

  test('campaign switch should allow adding firearms', async ({ page }) => {
    await openFirearmsTab(page)

    const addButton = getAddButton(getEquipmentRow(page, pistolRowName))
    await expect(addButton).toBeDisabled()
    await expect(addButton).toHaveAttribute(
      'title',
      'Turn on the firearms campaign to add these items',
    )

    await toggleFirearmsCampaign(page)
    await expect(addButton).toBeEnabled()
  })

  test('campaign switch should raise basic armor cost', async ({ page }) => {
    const chain = getEquipmentRow(page, 'Chain')
    await expect(
      chain.getByRole('cell', { name: '100', exact: true }),
    ).toBeVisible()

    await toggleFirearmsCampaign(page)
    await expect(
      chain.getByRole('cell', { name: '150', exact: true }),
    ).toBeVisible()
  })

  test('filters should change the cost and the available weapons', async ({
    page,
  }) => {
    await openFirearmsTab(page)

    const coefficient = page.getByText(/^Cost coefficient/)
    await expect(coefficient).toHaveText('Cost coefficient: 7')

    await page.locator('#rifled-checkbox').check()
    await expect(coefficient).toHaveText('Cost coefficient: 14')

    await expect(getEquipmentRow(page, pistolRowName)).toBeVisible()
    await page.locator('#Matchlock-radio').check()
    await expect(getEquipmentRow(page, pistolRowName)).toBeHidden()
    await expect(getEquipmentRow(page, 'Arquebus')).toBeVisible()
  })

  test('purchases should keep their variants', async ({ page }) => {
    await toggleFirearmsCampaign(page)
    await openFirearmsTab(page)

    await buyPistol(page)
    await buyPistol(page)
    await page.locator('#rifled-checkbox').check()
    await buyPistol(page)

    const inventory = await openInventory(page)
    const pistols = inventory.getByRole('row', { name: pistolRowName })
    await expect(pistols).toHaveCount(2)
    await expect(pistols.filter({ hasText: 'rifled' })).toHaveCount(1)
    await expect(
      pistols.filter({ hasNotText: 'rifled' }).getByTestId('item-qty'),
    ).toHaveText('2')
  })

  test('inventory should survive a page reload', async ({ page }) => {
    await toggleFirearmsCampaign(page)
    await openFirearmsTab(page)
    await buyPistol(page)

    await page.reload()
    await expect(page.getByTestId('CommandBar')).toBeVisible()

    await expect(getCampaignSwitch(page)).toBeChecked()
    const inventory = await openInventory(page)
    await expect(
      inventory.getByRole('row', { name: pistolRowName }),
    ).toBeVisible()
  })

  test('items should stay in the inventory when the campaign is off', async ({
    page,
  }) => {
    await toggleFirearmsCampaign(page)
    await openFirearmsTab(page)
    await buyPistol(page)

    await toggleFirearmsCampaign(page)

    const inventory = await openInventory(page)
    await expect(
      inventory.getByRole('row', { name: pistolRowName }),
    ).toBeVisible()
    await openEquipment(page)
    await expect(getCampaignSwitch(page)).not.toBeChecked()
  })
})

test.describe('Firearms Reference Tests', () => {
  for (const { heading, path } of [
    { heading: 'Firearms quick reference', path: '/firearms-reference' },
    {
      heading: 'Краткая справка по огнестрелу',
      path: '/ru/firearms-reference',
    },
  ]) {
    test(`should render ${path}`, async ({ page }) => {
      await page.goto(path)

      await expect(page.getByRole('heading', { name: heading })).toBeVisible()
    })
  }
})
