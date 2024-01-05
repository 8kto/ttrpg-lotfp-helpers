import type { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import type { LOCALES } from '@/translations/languages'

const languages: { [key: string]: MessageDescriptor } = {
  en: msg`EN`,
  ru: msg`RU`,
  cz: msg`CZ`,
}

const LocaleSwitcher = () => {
  const router = useRouter()
  const { i18n } = useLingui()

  const [locale, setLocale] = useState<LOCALES>(
    router.locale!.split('-')[0] as LOCALES,
  )

  // if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
  //   languages['pseudo'] = msg`Pseudo`
  // }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = event.target.value as LOCALES

    setLocale(newLocale)
    // FIXME keep hash state
    router.push(router.pathname, router.pathname, { locale: newLocale })
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className='ph-btn-primary md:lg-0 mr-1 block rounded border border-red-900 p-2.5 text-sm text-white  focus:border-primary-500 focus:ring-primary-500'
    >
      {Object.keys(languages).map((currLocale) => {
        return (
          <option value={currLocale} key={currLocale}>
            {i18n._(languages[currLocale as unknown as LOCALES])}
          </option>
        )
      })}
    </select>
  )
}

export default LocaleSwitcher
