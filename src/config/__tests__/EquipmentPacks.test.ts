import { EquipmentPacks } from '@/config/EquipmentPacks'

describe('EquipmentPacks', () => {
  describe('snapshots match', () => {
    it('whole set', () => {
      expect(EquipmentPacks).toMatchSnapshot()
    })
  })
})
