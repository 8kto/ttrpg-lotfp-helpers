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

    {/* Open Graph / Facebook */}
    <meta property='og:type' content='website' />
    <meta property='og:url' content={APP_URL} />
    <meta property='og:title' content={title + t`page.title.suffix`} />
    <meta property='og:description' content={description} />
    <meta property='og:image' content={'/icons/android-chrome-512x512.png'} />
  </Head>
)

export default HeadMetadata
