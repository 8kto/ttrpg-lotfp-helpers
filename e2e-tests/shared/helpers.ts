import type { Page } from '@playwright/test'

/* Small screens show equipment and inventory in tabs, larger ones in columns */
export const openInventory = async (page: Page) => {
  const inventoryTab = page.getByRole('tab', { name: 'Inventory' })

  if (await inventoryTab.isVisible()) {
    await inventoryTab.click()

    return page.locator('.ph-active-tabpanel')
  }

  return page.locator('.ph-inventory-page-content--columns > div').nth(1)
}

export const openEquipment = async (page: Page) => {
  const equipmentTab = page.getByRole('tab', { name: 'Equipment' })

  if (await equipmentTab.isVisible()) {
    await equipmentTab.click()
  }
}
