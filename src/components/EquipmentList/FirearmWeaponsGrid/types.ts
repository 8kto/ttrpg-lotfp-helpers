import type { FiringMechanism, YearPeriod } from '@/domain/firearms'

export type FilterValues = {
  firingMechanism: FiringMechanism
  rifled: boolean
  year: YearPeriod
}
