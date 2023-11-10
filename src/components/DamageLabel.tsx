import type { DamageDice } from '@/domain/weapon'

const DamageLabel = ({ damage }: { damage: DamageDice | null }) => {
  return damage ? `${damage?.x === 1 ? '' : damage?.x}${damage?.dice}` : '-'
}

export default DamageLabel
