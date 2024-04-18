import { expect, test } from '@playwright/test'

import { testLocales } from '../shared/consts'

test.describe('Inventory Snapshots Tests', () => {
  for (const { locale } of testLocales) {
    test(`matches screenshot default view [${locale}]`, async ({ page }) => {
      await page.goto(`/${locale}/inventory`)

      await expect(page).toHaveScreenshot(`default-view-${locale}.png`, {
        fullPage: true,
      })
    })
  }
})
