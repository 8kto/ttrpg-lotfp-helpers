import type {DamageDice} from "@/shared/types/weapon"

const DamageLabel = ({damage}: {damage: DamageDice | null}) => {
  return damage? (
    `${damage?.x === 1 ? '': damage?.x}${damage?.dice}`
  ) : '-'
}

export default DamageLabel