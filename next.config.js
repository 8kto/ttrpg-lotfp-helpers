// eslint-disable-next-line @typescript-eslint/no-var-requires
const linguiConfig = require('./lingui.config')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disableDevLogs: true,
})

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
  async redirects()    {
    return [
      {
        source: '/',
        destination: '/inventory',
        permanent: false,
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
