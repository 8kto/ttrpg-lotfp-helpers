// eslint-disable-next-line @typescript-eslint/no-var-requires
const { formatter } = require('@lingui/format-po')

const locales = ['en', 'ru', 'cz']

if (process.env.NODE_ENV !== 'production') {
  locales.push('pseudo')
}

/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: locales,
  sourceLocale: 'en',
  orderBy: 'messageId',
  pseudoLocale: 'pseudo',
  catalogs: [
    {
      path: 'src/translations/locales/{locale}',
      include: ['src/'],
    },
  ],
  format: formatter({ origins: false }),
}
