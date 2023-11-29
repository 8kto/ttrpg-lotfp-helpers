/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  i18n: {
    defaultLocale: 'default',
    localeDetection: false,
    locales: ['default', 'en', 'ru', 'cz'],
  },
  trailingSlash: true,
}

module.exports = nextConfig
