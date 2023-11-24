/* eslint-disable */
/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  output: 'export',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },
}

module.exports = nextConfig
