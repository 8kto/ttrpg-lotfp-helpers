import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LocaleSwitcher() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale && locale !== 'default',
  )

  return (
    <ul className='flex'>
      {otherLocales.map((locale) => {
        const { pathname, query, asPath } = router

        return (
          <li
            key={locale}
            className='mr-2 cursor-pointer font-semibold uppercase text-white'
          >
            <Link
              href={{ pathname, query }}
              as={asPath}
              locale={locale}
              legacyBehavior
            >
              {locale}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
