import type { Page} from '@playwright/test'
import { expect, test } from '@playwright/test'

test.describe('Equipment Grid Tests', () => {
  async function checkFirstItem(
    page: Page,
    tabTestId: string,
    expectedText: string,
  ) {
    await page.getByTestId(tabTestId).click()
    const firstItemText = page
      .getByTestId('DataGrid__Table')
      .locator('> tbody > tr:first-child > td:first-child')
    await expect(firstItemText).toHaveText(expectedText)
  }

  test('tabs properly switch and display correct grids', async ({ page }) => {
    await page.goto('/inventory')
    await expect(page.getByTestId('CommandBar')).toBeVisible()

    await checkFirstItem(page, 'Tab-armor', 'Chain')
    await checkFirstItem(page, 'Tab-melee', 'Battle axe')
    await checkFirstItem(page, 'Tab-missile', 'Arrow (1)')
    await checkFirstItem(page, 'Tab-miscEquipment', 'Air Bladder')
  })
})
