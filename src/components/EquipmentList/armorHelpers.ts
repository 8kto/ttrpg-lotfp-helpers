import type { ArmorItem } from '@/domain/armor'

// Campaigns using the firearms rules raise the cost of basic armor and shields
const FIREARMS_CAMPAIGN_ARMOR_COST_COEFF = 1.5

export const applyFirearmsCampaignCost = (
  items: ReadonlyArray<ArmorItem>,
  isFirearmsCampaign: boolean,
): Array<ArmorItem> => {
  if (!isFirearmsCampaign) {
    return [...items]
  }

  const raise = (costCp: number) =>
    Math.round(costCp * FIREARMS_CAMPAIGN_ARMOR_COST_COEFF)

  return items.map((item) => ({
    ...item,
    cityCostCp: raise(item.cityCostCp),
    ruralCostCp: item.ruralCostCp === null ? null : raise(item.ruralCostCp),
  }))
}
