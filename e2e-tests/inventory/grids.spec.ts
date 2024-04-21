import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

type TabName = 'Armor' | 'Melee' | 'Missiles' | 'Miscellaneous'

type TabDef = {
  name: TabName
  testId: string
}

type GridHeaderDef = {
  index: number
  name: string
}

const tabDefs: Record<TabName, TabDef> = {
  Armor: { name: 'Armor', testId: 'Tab-armor' },
  Melee: { name: 'Melee', testId: 'Tab-melee' },
  Missiles: { name: 'Missiles', testId: 'Tab-missile' },
  Miscellaneous: { name: 'Miscellaneous', testId: 'Tab-miscEquipment' },
}

test.describe('Equipment Grid Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory')
  })

  async function testFirstGridCell(
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

  test('tabs should properly switch and display correct grids', async ({
    page,
  }) => {
    await expect(page.getByTestId('CommandBar')).toBeVisible()

    await testFirstGridCell(page, tabDefs.Armor.testId, 'Chain')
    await testFirstGridCell(page, tabDefs.Melee.testId, 'Battle axe')
    await testFirstGridCell(page, tabDefs.Missiles.testId, 'Arrow (1)')
    await testFirstGridCell(page, tabDefs.Miscellaneous.testId, 'Air Bladder')
  })

  const testGridSorting = async (
    page: Page,
    header: Record<string, unknown> & GridHeaderDef,
  ) => {
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
      sortedValues = [...values].sort((a, b) => parseFloat(a!) - parseFloat(b!))
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

  test('should sort rows in Armor grid', async ({ page }) => {
    const gridHeaders: ReadonlyArray<Record<string, unknown> & GridHeaderDef> =
      [
        { name: 'AC', index: 2, type: 'number' },
        { name: 'Cost, sp', index: 3, type: 'number' },
        // FIXME sort by weight values not titles
        // { name: 'Weight', index: 4, type: 'string' },
        { name: 'Name', index: 1, type: 'string' },
      ]

    for (const header of gridHeaders) {
      await testGridSorting(page, header)
    }
  })

  test('should sort rows in Melee grid', async ({ page }) => {
    await page.getByTestId(tabDefs.Melee.testId).click()

    const gridHeaders: ReadonlyArray<Record<string, unknown> & GridHeaderDef> =
      [
        { name: 'Damage', index: 2, type: 'number' },
        { name: 'Cost, sp', index: 3, type: 'number' },
        // FIXME sort by weight values not titles
        // { name: 'Weight', index: 4, type: 'string' },
        { name: 'Name', index: 1, type: 'string' },
      ]

    for (const header of gridHeaders) {
      await testGridSorting(page, header)
    }
  })

  test('should sort rows in Missiles grid', async ({ page }) => {
    await page.getByTestId(tabDefs.Missiles.testId).click()

    const gridHeaders: ReadonlyArray<Record<string, unknown> & GridHeaderDef> =
      [
        { name: 'Damage', index: 2, type: 'number' },
        // FIXME sort by range
        // { name: 'Range', index: 3, type: 'string' },
        { name: 'Cost, sp', index: 4, type: 'number' },
        // FIXME sort by weight values not titles
        // { name: 'Weight', index: 4, type: 'string' },
        { name: 'Name', index: 1, type: 'string' },
      ]

    for (const header of gridHeaders) {
      await testGridSorting(page, header)
    }
  })

  test('should sort rows in Miscellaneous grid', async ({ page }) => {
    await page.getByTestId(tabDefs.Miscellaneous.testId).click()

    const gridHeaders: ReadonlyArray<Record<string, unknown> & GridHeaderDef> =
      [
        { name: 'Cost, sp', index: 2, type: 'number' },
        // FIXME sort by weight values not titles
        // { name: 'Weight', index: 4, type: 'string' },
        { name: 'Name', index: 1, type: 'string' },
      ]

    for (const header of gridHeaders) {
      await testGridSorting(page, header)
    }
  })
})
