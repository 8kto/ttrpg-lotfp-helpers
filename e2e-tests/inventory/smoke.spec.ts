import { expect, test } from '@playwright/test'

test.describe('Smoke test', () => {
  test('has title', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Princess Helpers/)
  })
})
