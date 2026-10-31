import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { openEquipment, openInventory } from '../shared/helpers'

test.describe('Inventory items', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory')
    await expect(page.getByTestId('CommandBar')).toBeVisible()
  })

  test.describe('Custom items', () => {
    const openCustomItemForm = async (page: Page) => {
      await openInventory(page)
      await page.getByTitle('Add item').click()

      return page.locator('form', {
        has: page.locator('#add-equip-item--name'),
      })
    }

    const expectInventoryCost = async (page: Page, cost: string) => {
      const inventoryCost = page
        .getByRole('term')
        .filter({ hasText: 'Inventory cost' })
        .locator('+ dd')
        .filter({ visible: true })

      await expect(inventoryCost).toHaveText(cost)
    }

    test('should use the currency shown by default', async ({ page }) => {
      const form = await openCustomItemForm(page)

      await expect(form.getByLabel('Silver')).toBeChecked()
      await form.getByLabel('Name').fill('Idol')
      await form.getByLabel('Cost').fill('10')
      await form.getByRole('button', { name: 'Add', exact: true }).click()

      await expectInventoryCost(page, '10 sp')
    })

    test('should use the currency selected last', async ({ page }) => {
      const form = await openCustomItemForm(page)

      await form.getByLabel('Name').fill('Idol')
      await form.getByLabel('Cost').fill('10')
      await form.getByLabel('Gold').check()
      await form.getByLabel('Silver').check()
      await form.getByRole('button', { name: 'Add', exact: true }).click()

      await expectInventoryCost(page, '10 sp')
    })
  })

  test('random pack should import the selected pack', async ({ page }) => {
    // Packs are listed in the config order, the third one is Fighter 1
    await page.evaluate(() => {
      Math.random = () => 0.25
    })
    const inventory = await openInventory(page)

    await page.getByTitle('Import Equipment set').click()
    await page.getByRole('button', { name: 'Select random' }).click()

    // The pack preview in the closed drawer lists Bedroll as well
    const grids = inventory.getByTestId('DataGrid__Table')
    await expect(grids.getByText('Two-handed sword')).toBeVisible()
    await expect(grids.getByText('Bedroll')).toBeHidden()
  })

  test('removing an item bought after a reload should keep the others', async ({
    page,
  }) => {
    const buyPistol = () =>
      page
        .getByTestId('DataGrid__Table')
        .first()
        .getByRole('row', { name: /^Pistol(?! brace)/ })
        .getByRole('button')
        .last()
        .click()

    await page.getByText('Firearms campaign', { exact: true }).click()
    await page.getByTestId('Tab-firearm').click()
    await buyPistol()

    await page.reload()
    await expect(page.getByTestId('CommandBar')).toBeVisible()
    await openEquipment(page)
    await page.getByTestId('Tab-firearm').click()
    await page.locator('#Flintlock-radio').check()
    await buyPistol()

    const inventory = await openInventory(page)
    const rows = inventory
      .getByTestId('DataGrid__Table')
      .first()
      .locator('tbody tr')
    await expect(rows).toHaveCount(2)

    await rows.first().getByRole('button').last().click()

    await expect(rows).toHaveCount(1)
  })
})
