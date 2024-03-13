/* eslint-disable @typescript-eslint/no-var-requires */

const isProd = process.env.NODE_ENV === 'production'

const runtimeCaching = require('next-pwa/cache')
const withPwa = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disableDevLogs: isProd,
  runtimeCaching,
  //disable: !isProd,
})

const linguiConfig = require('./lingui.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
    forceSwcTransforms: true,
  },
  i18n: {
    locales: linguiConfig.locales,
    defaultLocale: linguiConfig.sourceLocale,
  },
  distDir: 'build',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/inventory',
        permanent: false,
      },
    ]
  },
}

module.exports = withPwa(nextConfig)
