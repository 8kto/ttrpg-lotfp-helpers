import { t } from '@lingui/macro'
import Head from 'next/head'

import { APP_URL, AppMetadata } from '@/config/AppMetadata'

const HeadMetadata = ({
  title = AppMetadata.title as string,
  description = AppMetadata.description as string,
}: {
  title?: string
  description?: string
}) => (
  <Head>
    <title>{title.concat(t`page.title.suffix`)}</title>
    <meta name='description' content={description} />

    {/* Icons */}
    <link
      rel='apple-touch-icon'
      sizes='180x180'
      href='/icons/apple-touch-icon.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='64x64'
      href='/icons/favicon-64x64.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='32x32'
      href='/icons/favicon-32x32.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='16x16'
      href='/icons/favicon-16x16.png'
    />

    {/* Open Graph / Facebook */}
    <meta property='og:type' content='website' />
    <meta property='og:url' content={APP_URL} />
    <meta property='og:title' content={title + t`page.title.suffix`} />
    <meta property='og:description' content={description} />
    <meta property='og:image' content={'/icons/android-chrome-512x512.png'} />

    {/* PWA */}
    <meta name='princess-helpers' content='princess-helpers' />
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
    <meta name='apple-mobile-web-app-title' content='princess-helpers' />
    <meta name='format-detection' content='telephone=no' />
    <meta name='mobile-web-app-capable' content='yes' />
    <meta name='msapplication-TileColor' content='#2B5797' />
    <meta name='msapplication-tap-highlight' content='no' />
    <meta name='theme-color' content='#000000' />

    <link rel='manifest' href='/manifest.json' />
    <link rel='shortcut icon' href='/icons/favicon.ico' />
  </Head>
)

export default HeadMetadata
