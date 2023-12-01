import type { MessageDescriptor } from '@lingui/core'

export type EquipmentItemTranslated<T> = {
  name: MessageDescriptor
  details?: MessageDescriptor
} & Omit<T, 'name' | 'details'>
