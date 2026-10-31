import { applyFirearmsCampaignCost } from '@/components/EquipmentList/armorHelpers'
import Equipment from '@/config/Equipment'

describe('applyFirearmsCampaignCost', () => {
  const findCost = (items: ReturnType<typeof applyFirearmsCampaignCost>) =>
    Object.fromEntries(
      items.map((i) => [i.name, [i.cityCostCp, i.ruralCostCp]]),
    )

  it('raises the cost of the basic armor and shields by 50%', () => {
    const costs = findCost(applyFirearmsCampaignCost(Equipment.Armor, true))

    expect(costs['Leather']).toEqual([375, 750])
    expect(costs['Plate']).toEqual([15000, null])
    expect(costs['Shield']).toEqual([150, 375])
  })

  it('keeps the costs outside of a firearms campaign', () => {
    const costs = findCost(applyFirearmsCampaignCost(Equipment.Armor, false))

    expect(costs['Leather']).toEqual([250, 500])
    expect(costs['Shield']).toEqual([100, 250])
  })
})
