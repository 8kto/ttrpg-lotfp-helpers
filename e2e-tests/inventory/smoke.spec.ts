import { expect, test } from '@playwright/test'


test.describe('Inventory Smoke Tests', () => {
  test('has title', async ({ page }) => {
    await page.goto('/en/inventory')

    await expect(page).toHaveTitle(/Inventory — Princess Helpers/)
  })
})