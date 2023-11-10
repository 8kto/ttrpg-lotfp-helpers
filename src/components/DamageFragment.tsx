import type { DamageDice } from '@/domain/weapon'

const DamageFragment = ({ damage }: { damage: DamageDice | null }) => {
  return damage ? `${damage?.x === 1 ? '' : damage?.x}${damage?.dice}` : '-'
}

export default DamageFragment
