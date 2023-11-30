// eslint-disable-next-line @typescript-eslint/no-var-requires
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
}

module.exports = nextConfig
