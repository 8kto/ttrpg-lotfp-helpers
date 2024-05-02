import type { FiringMechanism, YearPeriod } from '@/domain/firearms'

export type FilterValues = {
  firingMechanism: FiringMechanism
  riffled: boolean
  year: YearPeriod
}
