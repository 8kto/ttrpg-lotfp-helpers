import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { render, screen } from '@testing-library/react'

import { useLinguiInit } from '@/translations/utils'

jest.mock('next/router', () => ({
  useRouter: () => ({ defaultLocale: 'en', locale: 'ru' }),
}))

const App = () => {
  useLinguiInit({})

  return (
    <I18nProvider i18n={i18n}>
      <p>{`Rendered in ${i18n.locale}`}</p>
    </I18nProvider>
  )
}

describe('useLinguiInit', () => {
  afterEach(() => {
    i18n.activate('en')
  })

  it('activates the locale before the first render', () => {
    jest.spyOn(console, 'warn').mockImplementation()
    i18n.activate('')

    render(<App />)

    expect(screen.getByText('Rendered in ru')).toBeTruthy()
  })
})
