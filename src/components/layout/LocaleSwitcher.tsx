import type { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useRouter } from 'next/router'

import type { LOCALE } from '@/translations/languages'

const languages: { [key: string]: MessageDescriptor } = {
  en: msg`EN`,
  ru: msg`RU`,
  cz: msg`CZ`,
}

// if (process.env.NEXT_PUBLIC_NODE_ENV !== 'production') {
//   languages['pseudo'] = msg`P*`
// }

const LocaleSwitcher = () => {
  const router = useRouter()
  const { i18n } = useLingui()
  const locale = router.locale!.split('-')[0] as LOCALE

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as LOCALE

    const newUrl = `${window.location.origin}/${newLocale}${router.pathname}${window.location.hash}`
    window.location.href = newUrl
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
            {i18n._(languages[currLocale as unknown as LOCALE])}
          </option>
        )
      })}
    </select>
  )
}

export default LocaleSwitcher
