import type { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import type { LOCALES } from '@/translations/languages'

const languages: { [key: string]: MessageDescriptor } = {
  en: msg`English`,
  ru: msg`Russian`,
  cz: msg`Czech`,
}

export function LocaleSwitcher() {
  const router = useRouter()
  const { i18n } = useLingui()

  const [locale, setLocale] = useState<LOCALES>(
    router.locale!.split('-')[0] as LOCALES,
  )

  if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
    languages['pseudo'] = msg`Pseudo`
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const locale = event.target.value as LOCALES

    setLocale(locale)
    router.push(router.pathname, router.pathname, { locale })
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className='block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500'
    >
      {Object.keys(languages).map((locale) => {
        return (
          <option value={locale} key={locale}>
            {i18n._(languages[locale as unknown as LOCALES])}
          </option>
        )
      })}
    </select>
  )
}

export default LocaleSwitcher
