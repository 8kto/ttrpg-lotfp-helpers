/* eslint-disable @typescript-eslint/no-var-requires */

const linguiConfig = require('./lingui.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', { useLinguiV5IdGeneration: true }]],
    // The t macro uses the global i18n instance, so pages prerendered in
    // parallel switch each other's locale mid-render
    staticGenerationMaxConcurrency: 1,
  },
  turbopack: {
    rules: {
      '*.po': {
        loaders: ['@lingui/loader'],
        as: '*.js',
      },
    },
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

module.exports = nextConfig
