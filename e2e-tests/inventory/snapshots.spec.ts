import { expect, test } from '@playwright/test'


test.describe('Inventory Snapshots Tests', () => {
  test('matches page screenshot', async ({ page }) => {
    await page.goto('/en/inventory')

    await expect(page).toHaveScreenshot("inventory.png", { fullPage: true })
  })
})