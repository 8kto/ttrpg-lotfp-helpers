import type { Page } from '@playwright/test'
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

  test('tabs should properly switch and display correct grids', async ({ page }) => {
    await page.goto('/inventory')
    await expect(page.getByTestId('CommandBar')).toBeVisible()

    await checkFirstItem(page, 'Tab-armor', 'Chain')
    await checkFirstItem(page, 'Tab-melee', 'Battle axe')
    await checkFirstItem(page, 'Tab-missile', 'Arrow (1)')
    await checkFirstItem(page, 'Tab-miscEquipment', 'Air Bladder')
  })

  test('should sort rows', async ({
    page,
  }) => {
    await page.goto('/inventory')

    const headers = [
      { name: 'AC', index: 2, type: 'number' },
      { name: 'Cost, sp', index: 3, type: 'number' },
      // FIXME sort by weight values not titles
      // { name: 'Weight', index: 4, type: 'string' },
      { name: 'Name', index: 1, type: 'string' },
    ]

    for (const header of headers) {
      // Click the header to sort by this column in ascending order
      await page.click(
        `table[data-testid="DataGrid__Table"] >> th:nth-child(${header.index})`,
      )

      // Grab text values of the first rows in this column to check sorting
      const values = await page.$$eval(
        `table[data-testid="DataGrid__Table"] >> tbody > tr > td:nth-child(${header.index})`,
        (tds: Array<HTMLElement>) => tds.map((td) => td.textContent?.trim()),
      )

      // Sort values based on their type
      let sortedValues
      if (header.type === 'number') {
        sortedValues = [...values].sort(
          (a, b) => parseFloat(a!) - parseFloat(b!),
        )
      } else {
        sortedValues = [...values].sort((a, b) => a!.localeCompare(b!))
      }
      expect(values).toEqual(sortedValues)

      // click again to sort in descending order and check
      await page.click(
        `table[data-testid="DataGrid__Table"] >> th:nth-child(${header.index})`,
      )
      const valuesDesc = await page.$$eval(
        `table[data-testid="DataGrid__Table"] >> tbody > tr > td:nth-child(${header.index})`,
        (tds: Array<HTMLElement>) => tds.map((td) => td.textContent?.trim()),
      )

      // Sort values in descending order based on their type
      let sortedValuesDesc
      if (header.type === 'number') {
        sortedValuesDesc = [...valuesDesc].sort(
          (a, b) => parseFloat(b!) - parseFloat(a!),
        )
      } else {
        sortedValuesDesc = [...valuesDesc].sort((a, b) => b!.localeCompare(a!))
      }
      expect(valuesDesc).toEqual(sortedValuesDesc)
    }
  })
})
