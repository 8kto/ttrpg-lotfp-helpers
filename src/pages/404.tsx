import type { GetStaticProps } from 'next'
import NextError from 'next/error'

import { loadCatalog } from '@/translations/utils'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!)

  return {
    props: {
      translation,
    },
  }
}

export default function NotFoundPage() {
  return <NextError statusCode={404} />
}
