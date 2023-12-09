import type { MessageDescriptor } from '@lingui/core'

export type EquipmentItemTranslated<T> = {
  name: MessageDescriptor | string
  details?: MessageDescriptor
} & Omit<T, 'name' | 'details'>
