import { expect, test } from '@playwright/test'

import { openInventory } from '../shared/helpers'

test.describe('Inventory Smoke Tests', () => {
  test('has title', async ({ page }) => {
    await page.goto('/en/inventory')

    await expect(page).toHaveTitle(/Inventory — Princess Helpers/)
  })

  test.describe('URL hash', () => {
    for (const hash of ['weather=bogus', 'terrain=bogus']) {
      test(`should ignore the invalid value of ${hash}`, async ({ page }) => {
        await page.goto(`/en/inventory#${hash}`)

        await expect(page.getByTestId('CommandBar')).toBeVisible()
        await expect(page.getByText('Bad things happened')).toBeHidden()
      })
    }

    test('should show the default tab for an unknown tab ID', async ({
      page,
    }) => {
      await page.goto('/en/inventory#activeEquipmentTabId=99')

      await expect(page.getByTestId('DataGrid__Table').first()).toBeVisible()
    })

    test('should show only the tabs and changed adjustments', async ({
      page,
    }) => {
      await page.goto('/en/inventory')
      await expect(page).toHaveURL(/#activeEquipmentTabId=0&activeTabId=0$/)

      await openInventory(page)
      await page.locator('#weather-adjustments').selectOption('Storm')

      await expect(page).toHaveURL(/#.*weather=Storm/)
      await expect(page).not.toHaveURL(/terrain=|version=/)
    })

    test('should restore adjustments from the URL', async ({ page }) => {
      await page.goto('/en/inventory#terrain=Forest')

      await expect(page.locator('#terrain-adjustments')).toHaveValue('Forest')
    })

    test('should not add history entries on UI changes', async ({ page }) => {
      await page.goto('/en/inventory')
      await expect(page.getByTestId('CommandBar')).toBeVisible()
      const entries = await page.evaluate(() => history.length)

      await page.getByTestId('Tab-melee').click()
      await page.getByTestId('Tab-missile').click()

      await expect(page).toHaveURL(/activeEquipmentTabId=2/)
      expect(await page.evaluate(() => history.length)).toBe(entries)
    })
  })
})
